const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');
const app = require('../../api/app');
const connection = require('../../database/connection');

const errorSchema = require('../schemas/ErrorSchema.json');
const objectiveSchema = require('../schemas/ObjectiveSchema.json');
const missionSchema = require('../schemas/MissionSchema.json');
const lastMissionSchema = require('../schemas/LastMissionSchema.json');

let user;

beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.seed.run();

    const response = await request(app)
        .post('/api/register')
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
    schemas: [missionSchema, lastMissionSchema, objectiveSchema, errorSchema],
}));

test('Validate schemas', () => {
    expect(lastMissionSchema).toBeValidSchema();
    expect(missionSchema).toBeValidSchema();
    expect(objectiveSchema).toBeValidSchema();
    expect(errorSchema).toBeValidSchema();
});

describe('LastMissions Index', () => {
    it('should list all animals, with their last avaliable mission for user', async () => {
        const response = await request(app)
            .get('/api/lastMissions')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(42);

        const testSchema = {
            $ref: 'lastMission#/definitions/arrayOfLastMissions',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const firstAnimal = response.body[0];
        const firstMission = firstAnimal.mission;
        const { objectives } = firstMission;
        expect(objectives).toHaveLength(4);
    });

    it('should validate JWT token', async () => {
        const response = await request(app)
            .get('/api/lastMissions');

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            error: 'Invalid token',
        });
    });
});

describe('LastMissions Get', () => {
    it('should list an animal, with his last avaliable mission for user', async () => {
        const response = await request(app)
            .get('/api/lastMissions/1')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'lastMission#/definitions/lastMission',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const animal = response.body;
        const firstMission = animal.mission;
        const { objectives } = firstMission;
        expect(objectives).toHaveLength(4);
    });

    it('should give error when not find animal', async () => {
        const response = await request(app)
            .get('/api/lastMissions/0')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Animal not found');
    });

    it('should validate JWT token', async () => {
        const response = await request(app)
            .get('/api/lastMissions/1');

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            error: 'Invalid token',
        });
    });
});

describe('LastMissions when update', () => {
    it('should change last mission when it is completed', async () => {
        const responseOld = await request(app)
            .get('/api/lastMissions/1')
            .set('Authorization', user.accessToken);

        const lastMissionOld = responseOld.body;
        const lastMissionOldId = lastMissionOld.mission.id;

        await request(app)
            .put(`/api/missions/${lastMissionOldId}`)
            .set('Authorization', user.accessToken)
            .send({
                completed: true,
            });

        const responseNew = await request(app)
            .get('/api/lastMissions/1')
            .set('Authorization', user.accessToken);

        const lastMissionNew = responseNew.body;
        const lastMissionNewId = lastMissionNew.mission.id;

        expect(lastMissionOldId).not.toEqual(lastMissionNewId);
        expect(lastMissionOld.mission.animal_id)
            .toEqual(lastMissionNew.mission.animal_id);
    });
});
