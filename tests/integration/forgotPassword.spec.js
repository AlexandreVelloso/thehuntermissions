const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');
const app = require('../../api/app');
const connection = require('../../database/connection');

beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();

    await request(app)
        .post('/api/auth/register')
        .send({
            username: 'user',
            email: 'user@email.com',
            password: '1234',
        });
});

afterAll(async () => {
    await connection.migrate.rollback();
});

const errorSchema = require('../schemas/ErrorSchema.json');

expect.extend(matchersWithOptions({
    schemas: [errorSchema],
}));

test('Validate schemas', () => {
    expect(errorSchema).toBeValidSchema();
});

describe('Forgot password', () => {
    it('should be able to return HTTP OK when finds the user email', async () => {
        const response = await request(app)
            .post('/api/forgotPassword')
            .send({
                email: 'user@email.com',
            });

        expect(response.status).toBe(200);
    });

    it('should give HTTP BAD REQUEST when not found user email', async () => {
        const response = await request(app)
            .post('/api/forgotPassword')
            .send({
                email: 'dontExist@email.com',
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Email not found');
    });
});
