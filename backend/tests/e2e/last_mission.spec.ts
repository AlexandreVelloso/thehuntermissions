import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import app from '../../api/app';
import connection from '../../database/connection';
import errorSchema from '../schemas/ErrorSchema.json';
import objectiveSchema from '../schemas/ObjectiveSchema.json';
import missionSchema from '../schemas/MissionSchema.json';
import lastMissionSchema from '../schemas/LastMissionSchema.json';
import UserCredentials from '../../api/Dtos/UserCredentialsDto';

function objectivesHasDuplicates(objectives: any) {
    for (let i = 0; i < objectives.length - 1; i += 1) {
        if (objectives[i].id === objectives[i + 1].id) {
            return true;
        }
    }

    return false;
}

let user: UserCredentials;

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
        expect(response.body).toHaveLength(43);

        const testSchema = {
            $ref: 'lastMission#/definitions/arrayOfLastMissions',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const firstAnimal = response.body[0];
        const firstMission = firstAnimal.mission;

        expect(firstMission.user_has_weapon).toBe(true);

        const { objectives } = firstMission;

        expect(objectives).toHaveLength(4);
        expect(objectives).toHaveLength(4);
        expect(objectives[0].user_id).toBe(null);
        expect(objectives[0].completed).toBe(false);
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

        expect(firstMission.user_has_weapon).toBe(true);

        const { objectives } = firstMission;

        expect(objectives).toHaveLength(4);
        expect(objectives).toHaveLength(4);
        expect(objectives[0].user_id).toBe(null);
        expect(objectives[0].completed).toBe(false);
    });

    it('should give 404 error when not find animal', async () => {
        const response = await request(app)
            .get('/api/lastMissions/99999')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Animal not found');
    });

    it('should give 400 error when animal id is not valid', async () => {
        const response = await request(app)
            .get('/api/lastMissions/0')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('\"id\" must be larger than or equal to 1');
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

describe('LastMissions test duplicates', () => {
    beforeAll(async () => {
        const requests = [];

        for (let missionId = 11; missionId <= 17; missionId += 1) {
            requests.push(
                request(app)
                    .put(`/api/missions/${missionId}`)
                    .set('Authorization', user.accessToken)
                    .send({
                        completed: true,
                    }),
            );
        }

        await Promise.all(requests);
    });

    it('Index last mission should not repeat objectives', async () => {
        const response = await request(app)
            .get('/api/lastMissions')
            .set('Authorization', user.accessToken);

        const { mission } = response.body[1];
        const objectivesToTest = mission.objectives;

        const hasDuplicates = objectivesHasDuplicates(objectivesToTest);

        expect(hasDuplicates).toBe(false);
    });

    it('Get last mission should not repeat objectives', async () => {
        const response = await request(app)
            .get('/api/lastMissions/2')
            .set('Authorization', user.accessToken);

        const { mission } = response.body;
        const objectivesToTest = mission.objectives;

        const hasDuplicates = objectivesHasDuplicates(objectivesToTest);

        expect(hasDuplicates).toBe(false);
    });
});
