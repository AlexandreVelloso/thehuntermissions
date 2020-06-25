import MissionService from "../../api/Services/MissionService";
import MissionServiceImpl from "../../api/Services/impl/MissionServiceImpl";

import MockObjectiveRepository from '../__mocks__/Repositories/MockObjectiveRepository';
import MockUserObjectiveRepository from '../__mocks__/Repositories/MockUserObjectiveRepository';
import MockMissionRepository from '../__mocks__/Repositories/MockMissionRepository';
import EntityNotFoundException from "../../api/Exceptions/EntityNotFoundException";

let missionService: MissionService;

beforeAll(() => {
    missionService = new MissionServiceImpl({
        missionRepository: new MockMissionRepository(),
        objectiveRepository: new MockObjectiveRepository(),
        userObjectiveRepository: new MockUserObjectiveRepository(),
    });
});

describe('Missions Service - Index', () => {
    it('should list all missions from user', async () => {
        const userId = 1;

        const result = await missionService.index(userId);

        expect(result)
            .toEqual([
                {
                    id: 1,
                    name: 'Mission 1',
                    reward: 100,
                    hint: 'hint',
                    animal_id: 1,
                    user_has_weapon: true,
                    objectives: [
                        {
                            id: 1,
                            name: 'Objective 1',
                            mission_id: 1,
                            user_id: 1,
                            completed: true,
                            user_has_weapon: true,
                            weapons: [],
                            created_at: '',
                            updated_at: '',
                        }
                    ],
                    created_at: '',
                    updated_at: '',
                },
                {
                    id: 2,
                    name: 'Mission 2',
                    reward: 200,
                    hint: 'hint',
                    animal_id: 1,
                    user_has_weapon: true,
                    objectives: [
                        {
                            id: 1,
                            name: 'Objective 2',
                            mission_id: 2,
                            user_id: 1,
                            completed: false,
                            user_has_weapon: true,
                            weapons: [],
                            created_at: '',
                            updated_at: '',
                        }
                    ],
                    created_at: '',
                    updated_at: '',
                }
            ]);
    });
});

describe('Missions Service - Get', () => {
    it('should retrieve a mission from user', async () => {
        const missionId = 1;
        const userId = 1;

        const result = await missionService.get(missionId, userId);

        expect(result)
            .toEqual({
                id: 1,
                name: 'Mission name',
                reward: 100,
                hint: 'hint',
                animal_id: 1,
                user_has_weapon: true,
                objectives: [
                    {
                        id: 1,
                        name: 'Objective',
                        mission_id: 1,
                        user_id: 1,
                        completed: true,
                        user_has_weapon: true,
                        weapons: [],
                        created_at: '',
                        updated_at: '',
                    }
                ],
                created_at: '',
                updated_at: '',
            });
    });

    it('should trhow excetion when mission not found', () => {
        const missionId = 0;
        const userId = 1;

        expect(missionService.get(missionId, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Mission not found'));
    });
});

describe('Missions Service - Update', () => {
    it('should update mission with objectives that exists', () => {
        const missionId = 1;
        const completed = true;
        const userId = 1;

        expect(missionService.update(missionId, completed, userId))
            .resolves
            .toBe(undefined);
    });

    it('should update mission with objectives that exists', () => {
        const missionId = 1;
        const completed = true;
        const userId = 1;

        expect(missionService.update(missionId, completed, userId))
            .resolves
            .toBe(undefined);
    });

    it('should give error when not find mission', () => {
        const missionId = 0;
        const completed = true;
        const userId = 1;

        expect(missionService.update(missionId, completed, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Mission not found'));
    })
});