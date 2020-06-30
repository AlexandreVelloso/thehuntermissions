import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import app from '../../api/app';
import { sign } from "../../api/Utils/JwtToken";
import connection from '../../database/connection';
import errorSchema from '../schemas/ErrorSchema.json';
import weaponSchema from '../schemas/weaponSchema.json';
import { generateWeapon } from '../__fakers__/WeaponFaker';
import { generateUserWeapon } from '../__fakers__/UserWeaponFaker';

let firstUserAccessToken: string;
let secondUserAccessToken: string;

beforeAll(() => {
    firstUserAccessToken = 'Bearer ' + sign({
        id: 1,
        username: 'user',
        email: 'firstUser@email.com',
    });

    secondUserAccessToken = 'Bearer ' + sign({
        id: 2,
        username: 'user',
        email: 'secondUser@email.com',
    });

    expect.extend(matchersWithOptions({
        schemas: [errorSchema, weaponSchema],
    }));

    test('Validate schemas', () => {
        expect(errorSchema).toBeValidSchema();
        expect(weaponSchema).toBeValidSchema();
    });
});

describe('Weapons Index', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should list all weapons', async () => {
        await connection.seed.run();

        const response = await request(app)
            .get('/api/weapons')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(61);

        const testSchema = {
            $ref: 'weapon#/definitions/arrayOfWeapons',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });
});

describe('Weapons Get', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const weaponId = 1;
        const userId = 1;

        await generateWeapon(weaponId);
        await generateUserWeapon(userId, weaponId, true);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should retrieve a weapon from a user', async () => {
        const response = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'weapon#/definitions/weapon',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });

    it('should give 404 error when not find weapon', async () => {
        const response = await request(app)
            .get('/api/weapons/999999')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Weapon not found');
    });

    it('should give 400 error when weapon id is not valid', async () => {
        const response = await request(app)
            .get('/api/weapons/0')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('\"id\" must be larger than or equal to 1');
    });
});

describe('Weapons Update', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const weaponId = 1;
        const userId = 1;

        await generateWeapon(weaponId);
        await generateUserWeapon(userId, weaponId, false);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should update weapon', async () => {
        const responseOld = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', firstUserAccessToken);

        const weaponOld = responseOld.body;
        expect(weaponOld.have_weapon).toBe(false);

        const responseUpdate = await request(app)
            .put('/api/weapons/1')
            .set('Authorization', firstUserAccessToken)
            .send({
                have_weapon: true,
            });

        expect(responseUpdate.status).toBe(204);

        const responseNew = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', firstUserAccessToken);

        const weaponNew = responseNew.body;
        expect(weaponNew.have_weapon).toBe(true);
    });

    it('should give an error when not find weapon to update', async () => {
        const response = await request(app)
            .put('/api/weapons/99999')
            .set('Authorization', firstUserAccessToken)
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

    it('should give an 400 error when id to update is not valid', async () => {
        const response = await request(app)
            .put('/api/weapons/0')
            .set('Authorization', firstUserAccessToken)
            .send({
                have_weapon: true,
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"weaponId\" must be larger than or equal to 1');
    });

    it('should give an 400 error when have_weapon is not present', async () => {
        const response = await request(app)
            .put('/api/weapons/1')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"haveWeapon\" is required');
    });
});

describe('Test weapons for two users', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const weaponId = 1;
        const userId = 1;

        await generateWeapon(weaponId);
        await generateUserWeapon(userId, weaponId, true);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should have different results for weapons indexes', async () => {
        const response1 = await request(app)
            .get('/api/weapons')
            .set('Authorization', firstUserAccessToken);

        const response2 = await request(app)
            .get('/api/weapons')
            .set('Authorization', secondUserAccessToken);

        const firstWeaponUser1 = response1.body[0];
        expect(firstWeaponUser1.user_id).toBe(1);
        expect(firstWeaponUser1.have_weapon).toBe(true);

        const firstWeaponUser2 = response2.body[0];
        expect(firstWeaponUser2.user_id).toBe(null);
        expect(firstWeaponUser2.have_weapon).toBe(false);
    });

    it('should have different results for weapons gets', async () => {
        const response1 = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', firstUserAccessToken);

        const response2 = await request(app)
            .get('/api/weapons/1')
            .set('Authorization', secondUserAccessToken);

        const firstWeaponUser1 = response1.body;
        expect(firstWeaponUser1.user_id).toBe(1);
        expect(firstWeaponUser1.have_weapon).toBe(true);

        const firstWeaponUser2 = response2.body;
        expect(firstWeaponUser2.user_id).toBe(null);
        expect(firstWeaponUser2.have_weapon).toBe(false);
    });
});