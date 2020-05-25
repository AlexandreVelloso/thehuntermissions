const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');
const app = require('../../api/app');
const connection = require('../../database/connection');
const jwtToken = require('../../api/utils/jwtToken');

const errorSchema = require('../schemas/ErrorSchema.json');
const loginResponseSchema = require('../schemas/LoginResponseSchema.json');

expect.extend(matchersWithOptions({
    schemas: [errorSchema, loginResponseSchema],
}));

test('Validate schemas', () => {
    expect(errorSchema).toBeValidSchema();
    expect(loginResponseSchema).toBeValidSchema();
});

describe('Register', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should be able to register user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'a@a.com',
                username: 'aa',
                password: '1234',
            });

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'loginResponse#/definitions/login',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const { user } = response.body;
        expect(user.username).toBe('aa');
        expect(user.email).toBe('a@a.com');
    });

    it('should not register a user with equal email', async () => {
        const user = {
            username: 'aa',
            email: 'a@a.com',
            password: '1234',
        };

        await request(app)
            .post('/api/auth/register')
            .send(user);

        const response = await request(app)
            .post('/api/auth/register')
            .send(user);

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Email already exists');
    });
});

describe('Login', () => {
    const user = {
        email: 'a@a.com',
        username: 'aa',
        password: '1234',
    };

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        await request(app)
            .post('/api/auth/register')
            .send(user);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should login a user that is registered', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: user.password,
            });

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'loginResponse#/definitions/login',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const { user: userResponse } = response.body;
        expect(userResponse.username).toBe('aa');
        expect(userResponse.email).toBe('a@a.com');
    });

    it('should validate user credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'wrong@email.com',
                password: 'wrong',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Username or password incorrect');
    });
});

describe('Refresh token', () => {
    let user;

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'a@a.com',
                username: 'aa',
                password: '1234',
            });

        user = response.body;
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should reset user token', async () => {
        const response = await request(app)
            .post('/api/auth/refresh')
            .send({
                refreshToken: user.refreshToken,
            });

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'loginResponse#/definitions/login',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });

    it('should fail when not found the refresh token', async () => {
        const response = await request(app)
            .post('/api/auth/refresh')
            .send({
                refreshToken: 'invalidToken',
            });

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid refresh token');
    });
});

describe('Reset password', () => {
    const user = {
        email: 'a@a.com',
        username: 'aa',
        password: '1234',
    };

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        await request(app)
            .post('/api/auth/register')
            .send(user);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should reset a user password', async () => {
        const token = jwtToken.sign({ email: 'a@a.com' });

        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirmPassword: 'newPassword',
                token,
            });

        expect(response.status).toBe(200);
    });

    it('should give error when passwords don\'t match', async () => {
        const token = jwtToken.sign({ email: 'a@a.com' });

        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirmPassword: 'password',
                token,
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('The passwords doesn\'t match');
    });

    it('should give error when the token is invalid', async () => {
        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirmPassword: 'newPassword',
                token: 'invalid token',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should give error when not find the user', async () => {
        const token = jwtToken.sign({ email: 'invalid@email.com' });

        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirmPassword: 'newPassword',
                token,
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('User not found');
    });

    it('should login with new password', async () => {
        const token = jwtToken.sign({ email: 'a@a.com' });

        await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirmPassword: 'newPassword',
                token,
            });

        const oldPasswordAttemptResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: user.password,
            });

        expect(oldPasswordAttemptResponse.status).toBe(400);

        const newPasswordAttemptResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: 'newPassword',
            });

        expect(newPasswordAttemptResponse.status).toBe(200);
    });
});
