import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import connection from "../../database/connection";
import { sign } from "../../api/Utils/JwtToken";
import app from '../../api/app';
import errorSchema from '../schemas/ErrorSchema.json';
import loginResponseSchema from '../schemas/LoginResponseSchema.json';
import { generateUser, generateUserWithDefaultPassword } from '../__fakers__/UserFaker';

beforeAll(async () => {
    expect.extend(matchersWithOptions({
        schemas: [errorSchema, loginResponseSchema],
    }));

    test('Validate schemas', () => {
        expect(errorSchema).toBeValidSchema();
        expect(loginResponseSchema).toBeValidSchema();
    });
});

describe('Register', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
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
        await generateUser('username', 'email@email.com');

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'username',
                email: 'email@email.com',
                password: '1234',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Email already exists');
    });

    it('should give error 400 when username is not present', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'email@email.com',
                password: 'password',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"username\" is required');
    });

    it('should give error 400 when email is not present', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'username',
                password: 'password'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"email\" is required');
    });

    it('should give error 400 when email is invalid', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'username',
                email: 'not an email',
                password: 'password'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"email\" must be a valid email');
    });

    it('should give error 400 when password is not present', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'username',
                email: 'email@email.com'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"password\" is required');
    });
});

describe('Login', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should login a user that is registered', async () => {
        const user = await generateUserWithDefaultPassword();

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: '1234'
            });

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'loginResponse#/definitions/login',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const { user: userResponse } = response.body;
        expect(userResponse.username).toBe(user.username);
        expect(userResponse.email).toBe(user.email);
    });

    it('should validate user credentials', async () => {
        await generateUser('usename', 'email');

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
        expect(response.body.error).toBe('Email or password incorrect');
    });

    it('should give error 400 when email is not present', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                password: 'password'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"email\" is required');
    });

    it('should give error 400 when password is not present', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'email@email.com'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"password\" is required');
    });

    it('should give error 400 when email is invalid', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'username',
                email: 'not an email',
                password: 'password'
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"email\" must be a valid email');
    });
});

describe('Reset password', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should reset a user password', async () => {
        await generateUser('username', 'a@a.com');

        const token = sign({ email: 'a@a.com' });

        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirm_password: 'newPassword',
                token,
            });

        expect(response.status).toBe(200);
    });

    it('should give error when passwords don\'t match', async () => {
        await generateUser('username', 'a@a.com');

        const token = sign({ email: 'a@a.com' });

        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirm_password: 'password',
                token,
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('The passwords don\'t match');
    });

    it('should give error when the token is invalid', async () => {
        await generateUser('username', 'a@a.com');

        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirm_password: 'newPassword',
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

    it('should give error when not find user', async () => {
        await generateUser('username', 'a@a.com');

        const token = sign({ email: 'invalid@email.com' });

        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirm_password: 'newPassword',
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

    it('should reset password and login with new password', async () => {
        const user = await generateUser('username', 'a@a.com');

        const token = sign({ email: 'a@a.com' });

        await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'newPassword',
                confirm_password: 'newPassword',
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

    it('should give error 400 when token is not present', async () => {
        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                password: 'password',
                confirm_password: 'password',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"token\" is required');
    });

    it('should give error 400 when password is not present', async () => {
        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                token: 'token',
                confirm_password: 'password',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"password\" is required');
    });

    it('should give error 400 when confirm password is not present', async () => {
        const response = await request(app)
            .post('/api/auth/resetPassword')
            .send({
                token: 'token',
                password: 'password',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"confirm_password\" is required');
    });
});

describe('Refresh token', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });
    
    it('should refresh user token', async () => {
        const user = await generateUser('username', 'a@a.com');

        const response = await request(app)
            .post('/api/auth/refresh')
            .send({
                refresh_token: user.refresh_token
            });

        expect(response.status).toBe(200);
    });

    it('should give error 400 when refresh token is not present', async () => {
        const response = await request(app)
            .post('/api/auth/refresh')
            .send();

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"refresh_token\" is required');
    });
});