import AnimalServiceImpl from "../../api/Services/impl/AnimalServiceImpl";
import AnimalService from "../../api/Services/AnimalService";
import EntityNotFoundException from "../../api/Exceptions/EntityNotFoundException";

import MockAnimalRepository from '../__mocks__/Repositories/MockAnimalRepository';

let animalService: AnimalService;

beforeAll(() => {
    animalService = new AnimalServiceImpl({
        animalRepository: new MockAnimalRepository(),
    });
});

describe('Animals Service - Index', () => {
    it('should list all animals', async () => {
        const userId = 1;

        const result = await animalService.index(userId);

        expect(result)
            .toEqual([
                {
                    id: 1,
                    name: 'animal',
                    missions: [
                        {
                            id: 1,
                            name: 'First mission',
                            reward: 100,
                            hint: '',
                            animal_id: 1,
                            user_has_weapon: true,
                            user_has_equipament: true,
                            objectives: [
                                {
                                    id: 1,
                                    name: 'First objective',
                                    mission_id: 1,
                                    user_id: 1,
                                    completed: true,
                                    user_has_weapon: true,
                                    user_has_equipament: true,
                                    weapons: [],
                                    equipaments: [],
                                    created_at: '',
                                    updated_at: '',
                                },
                                {
                                    id: 2,
                                    name: 'Second objective',
                                    mission_id: 1,
                                    user_id: 1,
                                    completed: true,
                                    user_has_weapon: true,
                                    user_has_equipament: true,
                                    weapons: [],
                                    equipaments: [],
                                    created_at: '',
                                    updated_at: '',
                                }
                            ],
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

describe('Animals Service - Get', () => {
    it('should retieve an animal from user', async () => {
        const animalId = 1;
        const userId = 1;

        const result = await animalService.get(animalId, userId);

        expect(result)
            .toEqual({
                id: 1,
                name: 'animal',
                missions: [
                    {
                        id: 1,
                        name: 'First mission',
                        reward: 100,
                        hint: '',
                        animal_id: 1,
                        user_has_weapon: true,
                        user_has_equipament: true,
                        objectives: [
                            {
                                id: 1,
                                name: 'First objective',
                                mission_id: 1,
                                user_id: 1,
                                completed: true,
                                user_has_weapon: true,
                                user_has_equipament: true,
                                weapons: [],
                                equipaments: [],
                                created_at: '',
                                updated_at: '',
                            },
                            {
                                id: 2,
                                name: 'Second objective',
                                mission_id: 1,
                                user_id: 1,
                                completed: true,
                                user_has_weapon: true,
                                user_has_equipament: true,
                                weapons: [],
                                equipaments: [],
                                created_at: '',
                                updated_at: '',
                            }
                        ],
                        created_at: '',
                        updated_at: '',
                    }
                ],
                created_at: '',
                updated_at: '',
            });
    });

    it('should throw exception when id is not valid', () => {
        const animalId = 0;
        const userId = 1;

        expect(animalService.get(animalId, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Animal not found'));
    });
});