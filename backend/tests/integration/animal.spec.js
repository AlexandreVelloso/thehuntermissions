const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');
const app = require('../../api/app');
const connection = require('../../database/connection');

const errorSchema = require('../schemas/ErrorSchema.json');
const objectiveSchema = require('../schemas/ObjectiveSchema.json');
const missionSchema = require('../schemas/MissionSchema.json');
const animalSchema = require('../schemas/AnimalSchema.json');

function objectivesHasDuplicates(objectives) {
    for (let i = 0; i < objectives.length - 1; i += 1) {
        if (objectives[i].id === objectives[i + 1].id) {
            return true;
        }
    }

    return false;
}

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
    schemas: [missionSchema, animalSchema, objectiveSchema, errorSchema],
}));

test('Validate schemas', () => {
    expect(animalSchema).toBeValidSchema();
    expect(missionSchema).toBeValidSchema();
    expect(objectiveSchema).toBeValidSchema();
    expect(errorSchema).toBeValidSchema();
});

describe('Animals Index', () => {
    it('should list all animals', async () => {
        const response = await request(app)
            .get('/api/animals')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(48);

        const testSchema = {
            $ref: 'animal#/definitions/arrayOfAnimals',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const firstAnimal = response.body[0];
        const firstMission = firstAnimal.missions[0];
        const { objectives } = firstMission;
        expect(objectives).toHaveLength(4);
    });

    it('should validate JWT token', async () => {
        const response = await request(app)
            .get('/api/animals');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should not repeat objective', async () => {
        const response = await request(app)
            .get('/api/animals')
            .set('Authorization', user.accessToken);

        const animal = response.body[1];
        const { missions } = animal;

        const objectivesToTest = missions[7].objectives;
        const hasDuplicates = objectivesHasDuplicates(objectivesToTest);

        expect(hasDuplicates).toBe(false);
    });
});

describe('Animals Get', () => {
    it('should retrieve a animal from user', async () => {
        const response = await request(app)
            .get('/api/animals/1')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'animal#/definitions/animal',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);

        const animal = response.body;
        const firstMission = animal.missions[0];
        const { objectives } = firstMission;
        expect(objectives).toHaveLength(4);
    });

    it('should give error when not find animal', async () => {
        const response = await request(app)
            .get('/api/animals/0')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Animal not found');
    });

    it('should validate JWT token', async () => {
        const response = await request(app)
            .get('/api/animals');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });

    it('should not repeat objective', async () => {
        const response = await request(app)
            .get('/api/animals/2')
            .set('Authorization', user.accessToken);

        const { missions } = response.body;

        const objectivesToTest = missions[7].objectives;
        const hasDuplicates = objectivesHasDuplicates(objectivesToTest);

        expect(hasDuplicates).toBe(false);
    });
});