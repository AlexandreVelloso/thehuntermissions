import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import connection from "../../database/connection";
import { sign } from "../../api/Utils/JwtToken";
import app from '../../api/app';
import animalSchema from '../schemas/AnimalSchema.json';
import missionSchema from '../schemas/MissionSchema.json';
import { generateAnimal } from '../__fakers__/AnimalFaker';
import { generateMission } from '../__fakers__/MissionFaker';
import { generateObjective } from '../__fakers__/ObjectiveFaker';
import { generateUserObjective } from '../__fakers__/UserObjectiveFaker';

let accessToken: string;

beforeAll(async () => {
    accessToken = 'Bearer ' + sign({
        id: 1,
        username: 'user',
        email: 'email@email.com',
    });

    expect.extend(matchersWithOptions({
        schemas: [missionSchema, animalSchema],
    }));

    test('Validate schemas', () => {
        expect(animalSchema).toBeValidSchema();
        expect(missionSchema).toBeValidSchema();
    });
});

describe('Animals Index', () => {

    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should seed all animals', async () => {
        const response = await request(app)
            .get('/api/animals')
            .set('Authorization', accessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(49);

        const testSchema = {
            $ref: 'animal#/definitions/arrayOfAnimals',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const firstAnimal = response.body[0];
        const firstMission = firstAnimal.missions[0];

        expect(firstMission.user_has_weapon).toBe(true);

        const { objectives } = firstMission;

        expect(objectives).toHaveLength(4);
        expect(objectives[0].user_id).toBe(null);
        expect(objectives[0].completed).toBe(false);
    });
});

describe('Animals Get', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const animal = await generateAnimal();
        const mission = await generateMission(animal.id);
        const objective = await generateObjective(mission.id);

        const userId = 1;

        await generateUserObjective(userId, objective.id);
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    });

    it('should retrieve a animal from user', async () => {
        const response = await request(app)
            .get('/api/animals/1')
            .set('Authorization', accessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'animal#/definitions/animal',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const animal = response.body;
        expect(animal.missions).toHaveLength(1);

        const firstMission = animal.missions[0];
        expect(firstMission.objectives).toHaveLength(1);
    });

    it('should give 400 error when id is not valid', async () => {
        const response = await request(app)
            .get('/api/animals/0')
            .set('Authorization', accessToken);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('\"id\" must be larger than or equal to 1');
    });

    it('should give 404 error when not find animal', async () => {
        const response = await request(app)
            .get('/api/animals/9999999')
            .set('Authorization', accessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Animal not found');
    });
});