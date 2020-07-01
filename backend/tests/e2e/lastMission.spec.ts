import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import app from '../../api/app';
import { sign } from "../../api/Utils/JwtToken";
import connection from '../../database/connection';
import errorSchema from '../schemas/ErrorSchema.json';
import objectiveSchema from '../schemas/ObjectiveSchema.json';
import missionSchema from '../schemas/MissionSchema.json';
import lastMissionSchema from '../schemas/LastMissionSchema.json';
import equipamentSchema from '../schemas/EquipamentSchema.json';
import { generateAnimal } from '../__fakers__/AnimalFaker';
import { generateMission } from '../__fakers__/MissionFaker';
import { generateObjective } from '../__fakers__/ObjectiveFaker';

let accessToken: string;

beforeAll(() => {
    accessToken = 'Bearer ' + sign({
        id: 1,
        username: 'user',
        email: 'email@email.com',
    });

    expect.extend(matchersWithOptions({
        schemas: [
            missionSchema,
            lastMissionSchema,
            objectiveSchema,
            errorSchema,
            equipamentSchema,
        ],
    }));

    test('Validate schemas', () => {
        expect(lastMissionSchema).toBeValidSchema();
        expect(missionSchema).toBeValidSchema();
        expect(objectiveSchema).toBeValidSchema();
        expect(errorSchema).toBeValidSchema();
        expect(equipamentSchema).toBeValidSchema();
    });
});

describe('LastMissions Index', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should list all animals, with their last avaliable mission for user', async () => {
        const response = await request(app)
            .get('/api/lastMissions')
            .set('Authorization', accessToken);

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
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const animalId = 1;
        const missionId = 1;
        const objectiveId = 1;

        await generateAnimal(animalId);
        await generateMission(missionId, animalId);
        await generateObjective(objectiveId, missionId);
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should list an animal, with his last avaliable mission for user', async () => {
        const response = await request(app)
            .get('/api/lastMissions/1')
            .set('Authorization', accessToken);

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

        expect(objectives[0].user_id).toBe(null);
        expect(objectives[0].completed).toBe(false);
    });

    it('should give 404 error when not find animal', async () => {
        const response = await request(app)
            .get('/api/lastMissions/99999')
            .set('Authorization', accessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Animal not found');
    });

    it('should give 400 error when animal id is not valid', async () => {
        const response = await request(app)
            .get('/api/lastMissions/0')
            .set('Authorization', accessToken);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('\"id\" must be larger than or equal to 1');
    });
});

describe('LastMissions when update', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const animalId = 1;
        const missionId = 1;
        const objectiveId = 1;

        await generateAnimal(animalId);
        await generateMission(missionId, animalId);
        await generateObjective(objectiveId, missionId);

        const otherMissionId = 2;
        const otherObjectiveId = 2;

        await generateMission(otherMissionId, animalId);
        await generateObjective(otherObjectiveId, otherMissionId);
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should change last mission when it is completed', async () => {
        const responseOld = await request(app)
            .get('/api/lastMissions/1')
            .set('Authorization', accessToken);

        const lastMissionOld = responseOld.body;
        const lastMissionOldId = lastMissionOld.mission.id;

        await request(app)
            .put(`/api/missions/${lastMissionOldId}`)
            .set('Authorization', accessToken)
            .send({
                completed: true,
            });

        const responseNew = await request(app)
            .get('/api/lastMissions/1')
            .set('Authorization', accessToken);

        const lastMissionNew = responseNew.body;
        const lastMissionNewId = lastMissionNew.mission.id;

        expect(lastMissionOldId).not.toEqual(lastMissionNewId);
        expect(lastMissionOld.mission.animal_id)
            .toEqual(lastMissionNew.mission.animal_id);
    });
});