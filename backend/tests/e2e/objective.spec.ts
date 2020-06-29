import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import app from '../../api/app';
import connection from '../../database/connection';
import errorSchema from '../schemas/ErrorSchema.json';
import objectiveSchema from '../schemas/ObjectiveSchema.json';
import weaponSchema from '../schemas/WeaponSchema.json';
import { generateObjective } from '../__fakers__/ObjectiveFaker';
import { generateUserObjective } from '../__fakers__/UserObjectiveFaker';
import { sign } from '../../api/Utils/JwtToken';

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
        schemas: [errorSchema, objectiveSchema, weaponSchema],
    }));

    test('Validate schemas', () => {
        expect(errorSchema).toBeValidSchema();
        expect(objectiveSchema).toBeValidSchema();
        expect(weaponSchema).toBeValidSchema();
    });
});

describe('Objectives Index', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should list all objectives from user', async () => {
        const response = await request(app)
            .get('/api/objectives')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1013);

        const testSchema = {
            $ref: 'objective#/definitions/arrayOfObjectives',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });
});

describe('Objectives Get', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const objective = await generateObjective();
        await generateUserObjective(1, objective.id);
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should retrieve a object from a user', async () => {
        const response = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'objective#/definitions/objective',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });

    it('should give 400 error when id is not valid', async () => {
        const response = await request(app)
            .get('/api/objectives/0')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('\"id\" must be larger than or equal to 1');
    });

    it('should give 404 error when not find objective', async () => {
        const response = await request(app)
            .get('/api/objectives/999999')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Objective not found');
    });
});

describe('Objectives Update', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const objective = await generateObjective(1);
        await generateUserObjective(1, objective.id);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should update objective', async () => {
        const responseOld = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', firstUserAccessToken);

        const objectiveOld = responseOld.body;
        expect(objectiveOld.completed).toBe(false);

        const responseUpdate = await request(app)
            .put('/api/objectives/1')
            .set('Authorization', firstUserAccessToken)
            .send({
                completed: true,
            });

        expect(responseUpdate.status).toBe(204);

        const responseNew = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', firstUserAccessToken);

        const objectiveNew = responseNew.body;
        expect(objectiveNew.completed).toBe(true);
    });

    it('should give an 400 error when id for update is not valid', async () => {
        const response = await request(app)
            .put('/api/objectives/0')
            .set('Authorization', firstUserAccessToken)
            .send({
                completed: true,
            });

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"objectiveId\" must be larger than or equal to 1');
    });

    it('should give an 400 error when completed is not present', async () => {
        const response = await request(app)
            .put('/api/objectives/1')
            .set('Authorization', firstUserAccessToken)

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"completed\" is required');
    });

    it('should give an error when not find objective to update', async () => {
        const response = await request(app)
            .put('/api/objectives/99999')
            .set('Authorization', firstUserAccessToken)
            .send({
                completed: true,
            });

        expect(response.status).toBe(404);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Objective not found');
    });
});

describe('Test objectives for two users', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const objective = await generateObjective(1);
        await generateUserObjective(1, objective.id, true);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should have different results for objectives indexes', async () => {
        const response1 = await request(app)
            .get('/api/objectives')
            .set('Authorization', firstUserAccessToken);

        const response2 = await request(app)
            .get('/api/objectives')
            .set('Authorization', secondUserAccessToken);

        const firstObjectiveUser1 = response1.body[0];
        expect(firstObjectiveUser1.user_id).toBe(1);
        expect(firstObjectiveUser1.completed).toBe(true);

        const firstObjectiveUser2 = response2.body[0];
        expect(firstObjectiveUser2.user_id).toBe(null);
        expect(firstObjectiveUser2.completed).toBe(false);
    });

    it('should have different results for objectives gets', async () => {
        const response1 = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', firstUserAccessToken);

        const response2 = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', secondUserAccessToken);

        const firstObjectiveUser1 = response1.body;
        expect(firstObjectiveUser1.user_id).toBe(1);
        expect(firstObjectiveUser1.completed).toBe(true);

        const firstObjectiveUser2 = response2.body;
        expect(firstObjectiveUser2.user_id).toBe(null);
        expect(firstObjectiveUser2.completed).toBe(false);
    });
});