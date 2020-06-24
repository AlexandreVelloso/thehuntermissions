import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import app from '../../api/app';
import errorSchema from '../schemas/ErrorSchema.json';

expect.extend(matchersWithOptions({
    schemas: [errorSchema],
}));

test('Validate schemas', () => {
    expect(errorSchema).toBeValidSchema();
});

describe('Weapons JWT middleware', () => {

    it('should validate JWT token for weapons index route', async () => {
        const response = await request(app)
            .get('/api/weapons');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should validate JWT token for weapons get route', async () => {
        const response = await request(app)
            .get('/api/weapons/1');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should validate JWT token for weapons update route', async () => {
        const response = await request(app)
            .put('/api/weapons/1');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

});

describe('Objectives JWT middleware', () => {

    it('should validate JWT token for objectives index route', async () => {
        const response = await request(app)
            .get('/api/objectives');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should validate JWT token for objectives get route', async () => {
        const response = await request(app)
            .get('/api/objectives/1');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should validate JWT token for objectives put route', async () => {
        const response = await request(app)
            .put('/api/objectives');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

});

describe('Missions JWT middleware', () => {
    it('should validate JWT token for missions index route', async () => {
        const response = await request(app)
            .get('/api/missions');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should validate JWT token for missions get route', async () => {
        const response = await request(app)
            .get('/api/missions/1');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should validate JWT token for missions update route', async () => {
        const response = await request(app)
            .put('/api/missions');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });
});

describe('LastMissions JWT middleware', () => {
    it('should validate JWT token for lastmissions index route', async () => {
        const response = await request(app)
            .get('/api/lastMissions');

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            error: 'Invalid token',
        });
    });

    it('should validate JWT token for lastmissions get route', async () => {
        const response = await request(app)
            .get('/api/lastMissions/1');

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            error: 'Invalid token',
        });
    });
});

describe('Animals JWT middleware', () => {
    it('should validate JWT token for animals index route', async () => {
        const response = await request(app)
            .get('/api/animals');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should validate JWT token for animals get route', async () => {
        const response = await request(app)
            .get('/api/animals/1');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });
});