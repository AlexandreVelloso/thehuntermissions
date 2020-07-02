import AnimalRepository from "../../../api/Repositories/AnimalRepository";

class MockAnimalRepository implements AnimalRepository {

    getAnimalsByUser(userId: any): any {
        if (userId <= 0 || userId > 100) {
            return undefined;
        }

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
                        user_has_weapon: 1,
                        objectives: [
                            {
                                id: 1,
                                name: 'First objective',
                                mission_id: 1,
                                user_id: 1,
                                completed: 1,
                                user_has_weapon: 1,
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
                                completed: 1,
                                user_has_weapon: 1,
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

    findAnimalByUser(animalId: number, userId: any): any {
        if (animalId <= 0 || animalId > 100) {
            return undefined;
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
                    user_has_weapon: 1,
                    objectives: [
                        {
                            id: 1,
                            name: 'First objective',
                            mission_id: 1,
                            user_id: 1,
                            completed: 1,
                            user_has_weapon: 1,
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
                            completed: 1,
                            user_has_weapon: 1,
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

    findById(id: number): any {
        if (id <= 0 || id > 100) {
            return undefined;
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
                    user_has_weapon: 1,
                    objectives: [
                        {
                            id: 1,
                            name: 'First objective',
                            mission_id: 1,
                            user_id: 1,
                            completed: 1,
                            user_has_weapon: 1,
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
                            completed: 1,
                            user_has_weapon: 1,
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

export default MockAnimalRepository;