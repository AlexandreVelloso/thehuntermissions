/* eslint-disable max-len */

const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');
const app = require('../../api/app');
const connection = require('../../database/connection');
const animalsMissions = require('../../api/utils/animalsMissions');

const errorSchema = require('../schemas/ErrorSchema.json');
const objectiveSchema = require('../schemas/ObjectiveSchema.json');
const missionSchema = require('../schemas/MissionSchema.json');

let user;

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

expect.extend(matchersWithOptions({
    schemas: [missionSchema, objectiveSchema, errorSchema],
}));

test('Validate schemas', () => {
    expect(objectiveSchema).toBeValidSchema();
    expect(missionSchema).toBeValidSchema();
    expect(errorSchema).toBeValidSchema();
});

describe('Missions Index', () => {
    it('should list all missions from user', async () => {
        const response = await request(app)
            .get('/api/missions')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(446);

        const testSchema = {
            $ref: 'mission#/definitions/arrayOfMissions',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const firstMission = response.body[0];
        const { objectives } = firstMission;

        expect(objectives).toHaveLength(4);
        expect(objectives[0].user_id).toBe(null);
        expect(objectives[0].completed).toBe(null);
    });

    it('should validate JWT token', async () => {
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
});

describe('Missions Get', () => {
    it('should retrieve a mission from user', async () => {
        const response = await request(app)
            .get('/api/missions/1')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'mission#/definitions/mission',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });

    it('should give error when not find mission', async () => {
        const response = await request(app)
            .get('/api/missions/0')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Mission not found');
    });

    it('should validate JWT token', async () => {
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
});

describe('Missions Update', () => {
    it('should update mission', async () => {
        const responseOld = await request(app)
            .get('/api/missions/1')
            .set('Authorization', user.accessToken);

        const oldObjectives = responseOld.body.objectives;
        const allOldObjectivesCompleted = animalsMissions.isAllObjectivesCompleted(oldObjectives);

        expect(allOldObjectivesCompleted).toBe(false);

        const responseUpdate = await request(app)
            .put('/api/missions/1')
            .set('Authorization', user.accessToken)
            .send({
                completed: true,
            });

        expect(responseUpdate.status).toBe(204);

        const responseNew = await request(app)
            .get('/api/missions/1')
            .set('Authorization', user.accessToken);

        const newObjectives = responseNew.body.objectives;
        const allNewObjectivesCompleted = animalsMissions.isAllObjectivesCompleted(newObjectives);

        expect(allNewObjectivesCompleted).toBe(true);
    });

    it('should give an error when not find mission to update', async () => {
        const response = await request(app)
            .put('/api/missions/0')
            .set('Authorization', user.accessToken)
            .send({
                completed: true,
            });

        expect(response.status).toBe(404);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Mission not found');
    });

    it('should validate JWT token', async () => {
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

describe('Test missions for two users', () => {
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
            .put('/api/missions/1')
            .set('Authorization', user.accessToken)
            .send({
                completed: true,
            });
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should have different results for missions indexes', async () => {
        const response1 = await request(app)
            .get('/api/missions')
            .set('Authorization', user.accessToken);

        const response2 = await request(app)
            .get('/api/missions')
            .set('Authorization', user2.accessToken);

        const firstMissoinObjectivesUser1 = response1.body[0].objectives;
        const allObjectivesCompletedUser1 = animalsMissions.isAllObjectivesCompleted(firstMissoinObjectivesUser1);

        expect(firstMissoinObjectivesUser1[0].user_id).toBe(1);
        expect(allObjectivesCompletedUser1).toBe(true);

        const firstMissoinObjectivesUser2 = response2.body[0].objectives;
        const allObjectivesCompletedUser2 = animalsMissions.isAllObjectivesCompleted(firstMissoinObjectivesUser2);

        expect(firstMissoinObjectivesUser2[0].user_id).toBe(null);
        expect(allObjectivesCompletedUser2).toBe(false);
    });

    it('should have different results for missions gets', async () => {
        const response1 = await request(app)
            .get('/api/missions/1')
            .set('Authorization', user.accessToken);

        const response2 = await request(app)
            .get('/api/missions/1')
            .set('Authorization', user2.accessToken);

        const firstMissoinObjectivesUser1 = response1.body.objectives;
        const allObjectivesCompletedUser1 = animalsMissions.isAllObjectivesCompleted(firstMissoinObjectivesUser1);

        expect(firstMissoinObjectivesUser1[0].user_id).toBe(1);
        expect(allObjectivesCompletedUser1).toBe(true);

        const firstMissoinObjectivesUser2 = response2.body.objectives;
        const allObjectivesCompletedUser2 = animalsMissions.isAllObjectivesCompleted(firstMissoinObjectivesUser2);

        expect(firstMissoinObjectivesUser2[0].user_id).toBe(null);
        expect(allObjectivesCompletedUser2).toBe(false);
    });
});
