import request from 'supertest';

import app from '../../api/app';
import { matchersWithOptions } from 'jest-json-schema';
import errorSchema from '../schemas/ErrorSchema.json';
import { generateUser } from '../__fakers__/UserFaker';
import connection from "../../database/connection";

beforeAll(() => {
    expect.extend(matchersWithOptions({
        schemas: [errorSchema],
    }));

    test('Validate schemas', () => {
        expect(errorSchema).toBeValidSchema();
    });
});

describe('Forgot password', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should be able to return HTTP OK when find the user email', async () => {
        await generateUser('username', 'email@email.com');

        const response = await request(app)
            .post('/api/forgotPassword')
            .send({
                email: 'email@email.com'
            });

        expect(response.status).toBe(200);
    });

    it('should give HTTP BAD REQUEST when not find user email', async () => {
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