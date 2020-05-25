const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');
const app = require('../../api/app');
const connection = require('../../database/connection');

let user;

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
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'user',
                email: 'user@email.com',
                password: '1234',
            });

        user = response.body;
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should list all weapons', async () => {
        await connection.seed.run();

        const response = await request(app)
            .get('/api/weapons')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(61);

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

describe('Weapons Get', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'user',
                email: 'user@email.com',
                password: '1234',
            });

        user = response.body;
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should retrieve a weapon from a user', async () => {
        const response = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'weapon#/definitions/weapon',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });

    it('should give error when not find weapon', async () => {
        const response = await request(app)
            .get('/api/weapons/0')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Weapon not found');
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

describe('Weapons Update', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'user',
                email: 'user@email.com',
                password: '1234',
            });

        user = response.body;
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should update weapon', async () => {
        const responseOld = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', user.accessToken);

        const weaponOld = responseOld.body;
        expect(weaponOld.have_weapon).toBe(null);

        const responseUpdate = await request(app)
            .put('/api/weapons/1')
            .set('Authorization', user.accessToken)
            .send({
                have_weapon: true,
            });

        expect(responseUpdate.status).toBe(204);

        const responseNew = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', user.accessToken);

        const weaponNew = responseNew.body;
        expect(weaponNew.have_weapon).toBe(1);
    });

    it('should give an error when not find weapon to update', async () => {
        const response = await request(app)
            .put('/api/weapons/0')
            .set('Authorization', user.accessToken)
            .send({
                have_weapon: true,
            });

        expect(response.status).toBe(404);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Weapon not found');
    });

    it('should validate JWT token', async () => {
        const response = await request(app)
            .put('/api/weapons');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });
});

describe('Test weapons for two users', () => {
    let user2;

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'user',
                email: 'user@email.com',
                password: '1234',
            });

        user = response.body;

        const response2 = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'user2',
                email: 'user2@email.com',
                password: '1234',
            });

        user2 = response2.body;

        await request(app)
            .put('/api/weapons/1')
            .set('Authorization', user.accessToken)
            .send({
                have_weapon: true,
            });
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should have different results for weapons indexes', async () => {
        const response1 = await request(app)
            .get('/api/weapons')
            .set('Authorization', user.accessToken);

        const response2 = await request(app)
            .get('/api/weapons')
            .set('Authorization', user2.accessToken);

        const firstWeaponUser1 = response1.body[0];
        expect(firstWeaponUser1.user_id).toBe(1);
        expect(firstWeaponUser1.have_weapon).toBe(1);

        const firstWeaponUser2 = response2.body[0];
        expect(firstWeaponUser2.user_id).toBe(null);
        expect(firstWeaponUser2.have_weapon).toBe(null);
    });

    it('should have different results for weapons gets', async () => {
        const response1 = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', user.accessToken);

        const response2 = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', user2.accessToken);

        const firstWeaponUser1 = response1.body;
        expect(firstWeaponUser1.user_id).toBe(1);
        expect(firstWeaponUser1.have_weapon).toBe(1);

        const firstWeaponUser2 = response2.body;
        expect(firstWeaponUser2.user_id).toBe(null);
        expect(firstWeaponUser2.have_weapon).toBe(null);
    });
});