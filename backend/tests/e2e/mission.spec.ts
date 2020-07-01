import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import app from '../../api/app';
import { sign } from "../../api/Utils/JwtToken";
import connection from '../../database/connection';
import errorSchema from '../schemas/ErrorSchema.json';
import objectiveSchema from '../schemas/ObjectiveSchema.json';
import equipamentSchema from '../schemas/EquipamentSchema.json';
import missionSchema from '../schemas/MissionSchema.json';
import { isAllObjectivesCompleted } from '../../api/Utils/AnimalsMissions';
import { generateMission } from '../__fakers__/MissionFaker';
import { generateObjective } from '../__fakers__/ObjectiveFaker';
import { generateUserObjective } from '../__fakers__/UserObjectiveFaker';

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
        schemas: [
            errorSchema,
            objectiveSchema,
            missionSchema,
            equipamentSchema,
        ],
    }));

    test('Validate schemas', () => {
        expect(errorSchema).toBeValidSchema();
        expect(objectiveSchema).toBeValidSchema();
        expect(missionSchema).toBeValidSchema();
        expect(equipamentSchema).toBeValidSchema();
    });
});

describe('Weapon Index', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should list all missions from user', async () => {
        const response = await request(app)
            .get('/api/missions')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(446);

        const testSchema = {
            $ref: 'mission#/definitions/arrayOfMissions',
        };

        const missions = response.body;

        expect(testSchema).toBeValidSchema();
        expect(missions).toMatchSchema(testSchema);

        const firstMission = missions[0];

        expect(firstMission.user_has_weapon).toBe(true);

        const { objectives } = firstMission;

        expect(objectives).toHaveLength(4);
        expect(objectives[0].user_id).toBe(null);
        expect(objectives[0].completed).toBe(false);
    });
});

describe('Weapon Get', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const objectiveId = 1;
        const missionId = 1;

        await generateMission(missionId);
        await generateObjective(objectiveId, missionId);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should retrieve a mission from user', async () => {
        const response = await request(app)
            .get('/api/missions/1')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'mission#/definitions/mission',
        };

        const mission = response.body;

        expect(testSchema).toBeValidSchema();
        expect(mission).toMatchSchema(testSchema);

        expect(mission.user_has_weapon).toBe(true);

        const { objectives } = mission;

        expect(objectives[0].user_id).toBe(null);
        expect(objectives[0].completed).toBe(false);
    });

    it('should give 404 error when not find mission', async () => {
        const response = await request(app)
            .get('/api/missions/99999')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Mission not found');
    });

    it('should give 400 error mission id is not valid', async () => {
        const response = await request(app)
            .get('/api/missions/0')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('\"id\" must be larger than or equal to 1');
    });
});

describe('Weapon Update', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const objectiveId = 1;
        const missionId = 1;

        await generateMission(missionId);
        await generateObjective(objectiveId, missionId);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should update mission', async () => {
        const responseOld = await request(app)
            .get('/api/missions/1')
            .set('Authorization', firstUserAccessToken);

        const oldObjectives = responseOld.body.objectives;
        const allOldObjectivesCompleted = isAllObjectivesCompleted(oldObjectives);

        expect(allOldObjectivesCompleted).toBe(false);

        const responseUpdate = await request(app)
            .put('/api/missions/1')
            .set('Authorization', firstUserAccessToken)
            .send({
                completed: true,
            });

        expect(responseUpdate.status).toBe(204);

        const responseNew = await request(app)
            .get('/api/missions/1')
            .set('Authorization', firstUserAccessToken);

        const newObjectives = responseNew.body.objectives;
        const allNewObjectivesCompleted = isAllObjectivesCompleted(newObjectives);

        expect(allNewObjectivesCompleted).toBe(true);
    });

    it('should give an error when not find mission to update', async () => {
        const response = await request(app)
            .put('/api/missions/999999')
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
        expect(response.body.error).toBe('Mission not found');
    });

    it('should give an 400 error when missionId to update is not valid', async () => {
        const response = await request(app)
            .put('/api/missions/0')
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
        expect(response.body.error).toBe('\"missionId\" must be larger than or equal to 1');
    });

    it('should give an 400 error when completed is not present', async () => {
        const response = await request(app)
            .put('/api/missions/1')
            .set('Authorization', firstUserAccessToken);

        expect(response.status).toBe(400);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('\"completed\" is required');
    });
});

describe('Test weapons for two users', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const objectiveId = 1;
        const missionId = 1;
        const userId = 1;

        await generateMission(missionId);
        await generateObjective(objectiveId, missionId);
        await generateUserObjective(userId, objectiveId, true);
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should have different results for missions indexes', async () => {
        const response1 = await request(app)
            .get('/api/missions')
            .set('Authorization', firstUserAccessToken);

        const response2 = await request(app)
            .get('/api/missions')
            .set('Authorization', secondUserAccessToken);

        const firstMissoinObjectivesUser1 = response1.body[0].objectives;
        const allObjectivesCompletedUser1 = isAllObjectivesCompleted(firstMissoinObjectivesUser1);

        expect(firstMissoinObjectivesUser1[0].user_id).toBe(1);
        expect(allObjectivesCompletedUser1).toBe(true);

        const firstMissoinObjectivesUser2 = response2.body[0].objectives;
        const allObjectivesCompletedUser2 = isAllObjectivesCompleted(firstMissoinObjectivesUser2);

        expect(firstMissoinObjectivesUser2[0].user_id).toBe(null);
        expect(allObjectivesCompletedUser2).toBe(false);
    });

    it('should have different results for missions gets', async () => {
        const response1 = await request(app)
            .get('/api/missions/1')
            .set('Authorization', firstUserAccessToken);

        const response2 = await request(app)
            .get('/api/missions/1')
            .set('Authorization', secondUserAccessToken);

        const firstMissoinObjectivesUser1 = response1.body.objectives;
        const allObjectivesCompletedUser1 = isAllObjectivesCompleted(firstMissoinObjectivesUser1);

        expect(firstMissoinObjectivesUser1[0].user_id).toBe(1);
        expect(allObjectivesCompletedUser1).toBe(true);

        const firstMissoinObjectivesUser2 = response2.body.objectives;
        const allObjectivesCompletedUser2 = isAllObjectivesCompleted(firstMissoinObjectivesUser2);

        expect(firstMissoinObjectivesUser2[0].user_id).toBe(null);
        expect(allObjectivesCompletedUser2).toBe(false);
    });
});