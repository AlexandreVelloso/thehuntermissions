const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');
const app = require('../../api/app');
const connection = require('../../database/connection');
const jwt = require('../../api/utils/jwtToken');

const token = jwt.sign({
    id: 1,
    username: 'user',
    email: 'user@email.com',
});

beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
});

afterEach(async () => {
    await connection.migrate.rollback();
});

const errorSchema = require('../schemas/ErrorSchema.json');
const weaponSchema = require('../schemas/WeaponSchema.json');

expect.extend(matchersWithOptions({
    schemas: [weaponSchema, errorSchema],
}));

test('Validate schemas', () => {
    expect(weaponSchema).toBeValidSchema();
    expect(errorSchema).toBeValidSchema();
});

describe('Weapons Index', () => {
    it('should list all weapons', async () => {
        await connection.seed.run();

        const response = await request(app)
            .get('/api/weapons')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(55);

        const testSchema = {
            $ref: 'weapon#/definitions/arrayOfWeapons',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });

    it('should validate JWT token', async () => {
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
});
