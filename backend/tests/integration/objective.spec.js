const request = require('supertest');
const { matchersWithOptions } = require('jest-json-schema');
const app = require('../../api/app');
const connection = require('../../database/connection');

const errorSchema = require('../schemas/ErrorSchema.json');
const objectiveSchema = require('../schemas/ObjectiveSchema.json');

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
    schemas: [objectiveSchema, errorSchema],
}));

test('Validate schemas', () => {
    expect(objectiveSchema).toBeValidSchema();
    expect(errorSchema).toBeValidSchema();
});

describe('Objectives Index', () => {
    it('should list all objectives from user', async () => {
        const response = await request(app)
            .get('/api/objectives')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1013);

        const testSchema = {
            $ref: 'objective#/definitions/arrayOfObjectives',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });

    it('should validate JWT token', async () => {
        const response = await request(app)
            .get('/api/objectives');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });
});

describe('Objectives Get', () => {
    it('should retrieve a object from a user', async () => {
        const response = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(200);

        const testSchema = {
            $ref: 'objective#/definitions/objective',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
    });

    it('should give error when not find objective', async () => {
        const response = await request(app)
            .get('/api/objectives/0')
            .set('Authorization', user.accessToken);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Objective not found');
    });

    it('should validate JWT token', async () => {
        const response = await request(app)
            .get('/api/objectives');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });
});

describe('Objectives Update', () => {
    it('should update objective', async () => {
        const responseOld = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', user.accessToken);

        const objectiveOld = responseOld.body;
        expect(objectiveOld.completed).toBe(null);

        const responseUpdate = await request(app)
            .put('/api/objectives/1')
            .set('Authorization', user.accessToken)
            .send({
                completed: true,
            });

        expect(responseUpdate.status).toBe(204);

        const responseNew = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', user.accessToken);

        const objectiveNew = responseNew.body;
        expect(objectiveNew.completed).toBe(1);
    });

    it('should give an error when not find objective to update', async () => {
        const response = await request(app)
            .put('/api/objectives/0')
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
        expect(response.body.error).toBe('Objective not found');
    });

    it('should validate JWT token', async () => {
        const response = await request(app)
            .put('/api/objectives');

        expect(response.status).toBe(401);

        const testSchema = {
            $ref: 'error#/definitions/error',
        };

        expect(testSchema).toBeValidSchema();
        expect(response.body).toMatchSchema(testSchema);
        expect(response.body.error).toBe('Invalid token');
    });
});

describe('Test objectives for two users', () => {
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
            .put('/api/objectives/1')
            .set('Authorization', user.accessToken)
            .send({
                completed: true,
            });
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    it('should have different results for objectives indexes', async () => {
        const response1 = await request(app)
            .get('/api/objectives')
            .set('Authorization', user.accessToken);

        const response2 = await request(app)
            .get('/api/objectives')
            .set('Authorization', user2.accessToken);

        const firstObjectiveUser1 = response1.body[0];
        expect(firstObjectiveUser1.user_id).toBe(1);
        expect(firstObjectiveUser1.completed).toBe(1);

        const firstObjectiveUser2 = response2.body[0];
        expect(firstObjectiveUser2.user_id).toBe(null);
        expect(firstObjectiveUser2.completed).toBe(null);
    });

    it('should have different results for objectives gets', async () => {
        const response1 = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', user.accessToken);

        const response2 = await request(app)
            .get('/api/objectives/1')
            .set('Authorization', user2.accessToken);

        const firstObjectiveUser1 = response1.body;
        expect(firstObjectiveUser1.user_id).toBe(1);
        expect(firstObjectiveUser1.completed).toBe(1);

        const firstObjectiveUser2 = response2.body;
        expect(firstObjectiveUser2.user_id).toBe(null);
        expect(firstObjectiveUser2.completed).toBe(null);
    });
});
