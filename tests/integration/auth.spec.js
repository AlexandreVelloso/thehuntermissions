const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');
const app = require('../../api/app');
const connection = require('../../database/connection');

beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
});

afterEach(async () => {
    await connection.migrate.rollback();
});

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
    it('should be able to register user', async () => {
        const response = await request(app)
            .post('/api/register')
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
            .post('/api/register')
            .send(user);

        const response = await request(app)
            .post('/api/register')
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
        await request(app)
            .post('/api/register')
            .send(user);
    });

    it('should login a user that is registered', async () => {
        const response = await request(app)
            .post('/api/login')
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
            .post('/api/login')
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
