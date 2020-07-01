import AnimalService from "../../../api/Services/AnimalService";
import EntityNotFoundException from "../../../api/Exceptions/EntityNotFoundException";

class MockAnimalService implements AnimalService {

    async index(userId: number): Promise<any> {
        return [
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
                                completed: false,
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
        ];
    }

    async get(animalId: number, userId: number): Promise<any> {
        if (animalId <= 0 || animalId > 100) {
            throw new EntityNotFoundException('Animal not found');
        }

        return {
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
                            completed: false,
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
        };
    }

}

export default MockAnimalService;