import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import app from '../../api/app';
import { sign } from "../../api/Utils/JwtToken";
import connection from '../../database/connection';
import errorSchema from '../schemas/ErrorSchema.json';
import equipamentSchema from '../schemas/EquipamentSchema.json';
import { generateEquipament } from '../__fakers__/EquipamentFaker';
import { generateUserEquipament } from '../__fakers__/UserEquipamentFaker';

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
        schemas: [errorSchema, equipamentSchema],
    }));

    test('Validate schemas', () => {
        expect(errorSchema).toBeValidSchema();
        expect(equipamentSchema).toBeValidSchema();
    });
});

describe('Equipaments Index', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should list all equipaments', async () => {
        const response = await request(app)
            .get('/api/equipaments')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(6);

        const testSchema = {
            $ref: 'equipament#/definitions/arrayOfEquipaments',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });
});

describe('Equipaments Get', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const equipamentId = 1;
        const userId = 1;

        await generateEquipament(equipamentId);
        await generateUserEquipament(userId, equipamentId, true);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should retrieve an equipament from a user', async () => {
        const response = await request(app)
            .get('/api/equipaments/1')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'equipament#/definitions/equipament',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });

    it('should give 404 error when not find equipament', async () => {
        const response = await request(app)
            .get('/api/equipaments/999999')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Equipament not found');
    });

    it('should give 400 error when equipament id is not valid', async () => {
        const response = await request(app)
            .get('/api/equipaments/0')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('\"id\" must be larger than or equal to 1');
    });
});

describe('Equipaments Update', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const equipamentId = 1;
        const userId = 1;

        await generateEquipament(equipamentId);
        await generateUserEquipament(userId, equipamentId, false);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should update equipament', async () => {
        const responseOld = await request(app)
            .get('/api/equipaments/1')
            .set('Authorization', firstUserAccessToken);

        const equipamentOld = responseOld.body;
        expect(equipamentOld.have_equipament).toBe(false);

        const responseUpdate = await request(app)
            .put('/api/equipaments/1')
            .set('Authorization', firstUserAccessToken)
            .send({
                have_equipament: true,
            });

        expect(responseUpdate.status).toBe(204);

        const responseNew = await request(app)
            .get('/api/equipaments/1')
            .set('Authorization', firstUserAccessToken);

        const equipamentNew = responseNew.body;
        expect(equipamentNew.have_equipament).toBe(true);
    });

    it('should give an error when not find equipament to update', async () => {
        const response = await request(app)
            .put('/api/equipaments/99999')
            .set('Authorization', firstUserAccessToken)
            .send({
                have_equipament: true,
            });

        expect(response.status).toBe(404);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Equipament not found');
    });

    it('should give an 400 error when id to update is not valid', async () => {
        const response = await request(app)
            .put('/api/equipaments/0')
            .set('Authorization', firstUserAccessToken)
            .send({
                have_equipament: true,
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"equipamentId\" must be larger than or equal to 1');
    });

    it('should give an 400 error when have_equipament is not present', async () => {
        const response = await request(app)
            .put('/api/equipaments/1')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"haveEquipament\" is required');
    });
});

describe('Test equipaments for two users', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const equipamentId = 1;
        const userId = 1;

        await generateEquipament(equipamentId);
        await generateUserEquipament(userId, equipamentId, true);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should have different results for equipaments indexes', async () => {
        const response1 = await request(app)
            .get('/api/equipaments')
            .set('Authorization', firstUserAccessToken);

        const response2 = await request(app)
            .get('/api/equipaments')
            .set('Authorization', secondUserAccessToken);

        const firstEquipamentUser1 = response1.body[0];
        expect(firstEquipamentUser1.user_id).toBe(1);
        expect(firstEquipamentUser1.have_equipament).toBe(true);

        const firstEquipamentUser2 = response2.body[0];
        expect(firstEquipamentUser2.user_id).toBe(null);
        expect(firstEquipamentUser2.have_equipament).toBe(false);
    });

    it('should have different results for equipaments gets', async () => {
        const response1 = await request(app)
            .get('/api/equipaments/1')
            .set('Authorization', firstUserAccessToken);

        const response2 = await request(app)
            .get('/api/equipaments/1')
            .set('Authorization', secondUserAccessToken);

        const firstEquipamentUser1 = response1.body;
        expect(firstEquipamentUser1.user_id).toBe(1);
        expect(firstEquipamentUser1.have_equipament).toBe(true);

        const firstEquipamentUser2 = response2.body;
        expect(firstEquipamentUser2.user_id).toBe(null);
        expect(firstEquipamentUser2.have_equipament).toBe(false);
    });
});