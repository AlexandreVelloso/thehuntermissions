import ObjectiveService from "../../api/Services/ObjectiveService"
import ObjectiveServiceImpl from "../../api/Services/impl/ObjectiveServiceImpl";
import EntityNotFoundException from "../../api/Exceptions/EntityNotFoundException";

import MockObjectiveRepository from '../__mocks__/Repositories/MockObjectiveRepository';
import MockUserObjectiveRepository from '../__mocks__/Repositories/MockUserObjectiveRepository';

let objectiveService: ObjectiveService;

beforeAll(() => {
    objectiveService = new ObjectiveServiceImpl({
        objectiveRepository: new MockObjectiveRepository(),
        userObjectiveRepository: new MockUserObjectiveRepository(),
    });
});

describe('Objectives Service - Index', () => {
    it('should list all objectives from a user', async () => {
        const result = await objectiveService.index(1);

        expect(result)
            .toEqual([
                {
                    id: 1,
                    name: 'Objective 1',
                    mission_id: 1,
                    user_id: 1,
                    completed: true,
                    weapons: [],
                    user_has_weapon: true,
                    created_at: '',
                    updated_at: '',
                },
                {
                    id: 2,
                    name: 'Objective 2',
                    mission_id: 1,
                    user_id: 1,
                    completed: false,
                    weapons: [],
                    user_has_weapon: true,
                    created_at: '',
                    updated_at: '',
                }
            ]);
    });
});

describe('Objectives Service - Get', () => {
    it('should retrieve an objective from a user', async () => {
        const objectiveId = 1;
        const userId = 1;

        const result = await objectiveService.get(objectiveId, userId);

        expect(result)
            .toEqual({
                id: 1,
                name: 'Objective',
                mission_id: 1,
                user_id: 1,
                completed: true,
                weapons: [],
                user_has_weapon: true,
                created_at: '',
                updated_at: '',
            });
    });

    it('should throw exception when objective not found', () => {
        const objectiveId = 0;
        const userId = 1;

        expect(objectiveService.get(objectiveId, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Objective not found'));
    });
});

describe('Objectives Service - Update', () => {
    it('should update objective', () => {
        const objectiveId = 1;
        const completed = true;
        const userId = 1;

        expect(objectiveService.update(objectiveId, completed, userId))
            .resolves
            .toBe(undefined);
    });

    it('should update objective when user does not have objective', () => {
        const objectiveId = 1000;
        const completed = true;
        const userId = 1;

        expect(objectiveService.update(objectiveId, completed, userId))
            .resolves
            .toBe(undefined);
    });

    it('should trhow exception when not found objective', () => {
        const objectiveId = 0;
        const completed = true;
        const userId = 1;

        expect(objectiveService.update(objectiveId, completed, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Objective not found'));
    });
});