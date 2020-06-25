import request from 'supertest';
import { matchersWithOptions } from 'jest-json-schema';

import connection from "../../database/connection";
import { sign } from "../../api/Utils/JwtToken";
import app from '../../api/app';
import animalSchema from '../schemas/AnimalSchema.json';
import missionSchema from '../schemas/MissionSchema.json';

let accessToken: string;

beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    await connection.seed.run();

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

afterAll(async () => {
    await connection.migrate.rollback();
});

describe('Animals Index', () => {
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
        const firstMission = animal.missions[0];

        expect(firstMission.user_has_weapon).toBe(true);

        const { objectives } = firstMission;

        expect(objectives).toHaveLength(4);
        expect(objectives[0].user_id).toBe(null);
        expect(objectives[0].completed).toBe(false);
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