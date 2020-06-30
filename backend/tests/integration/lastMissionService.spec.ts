import LastMissionService from "../../api/Services/LastMissionService";
import LastMissionServiceImpl from "../../api/Services/impl/LastMissionServiceImpl";
import EntityNotFoundException from "../../api/Exceptions/EntityNotFoundException";

import MockAnimalService from '../__mocks__/Services/MockAnimalService';

let lastMissionService: LastMissionService;

beforeAll(() => {
    lastMissionService = new LastMissionServiceImpl({
        animalService: new MockAnimalService(),
    });
});

describe('LastMissions Service - Index', () => {
    it('should list all animals, with their last avaliable mission for user', async () => {
        const userId = 1;

        const result = await lastMissionService.index(userId);

        expect(result)
            .toEqual([
                {
                    id: 1,
                    name: 'animal',
                    mission: {
                        id: 1,
                        name: 'First mission',
                        reward: 100,
                        hint: '',
                        animal_id: 1,
                        user_has_weapon: true,
                        objectives: [
                            {
                                id: 1,
                                name: 'First objective',
                                mission_id: 1,
                                user_id: 1,
                                completed: true,
                                user_has_weapon: true,
                                weapons: [],
                                created_at: '',
                                updated_at: '',
                            },
                            {
                                id: 2,
                                name: 'Second objective',
                                mission_id: 1,
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
                    },
                    created_at: '',
                    updated_at: '',
                }
            ]);
    });
});

describe('LastMissions Service - Get', () => {
    it('should retrieve an animal, with his last avaliable mission for user', async () => {
        const animalId = 1;
        const userId = 1;

        const result = await lastMissionService.get(animalId, userId);

        expect(result)
            .toEqual({
                id: 1,
                name: 'animal',
                mission: {
                    id: 1,
                    name: 'First mission',
                    reward: 100,
                    hint: '',
                    animal_id: 1,
                    user_has_weapon: true,
                    objectives: [
                        {
                            id: 1,
                            name: 'First objective',
                            mission_id: 1,
                            user_id: 1,
                            completed: true,
                            user_has_weapon: true,
                            weapons: [],
                            created_at: '',
                            updated_at: '',
                        },
                        {
                            id: 2,
                            name: 'Second objective',
                            mission_id: 1,
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
                },
                created_at: '',
                updated_at: '',
            });
    });

    it('should trhow error when not found animal', () => {
        const animalId = 0;
        const userId = 1;

        expect(lastMissionService.get(animalId, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Animal not found'));
    });
});