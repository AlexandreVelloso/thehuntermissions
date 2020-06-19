import {
    getAnimalsLastMission,
    getLastMission,
    isAllObjectivesCompleted,
} from '../../api/Utils/AnimalsMissions';
import ObjectiveDto from '../../api/Dtos/ObjectiveDto';
import MissionDto from '../../api/Dtos/MissionDto';
import AnimalDto from '../../api/Dtos/AnimalDto';

describe('Animals missions - isAllObjectivesCompleted', () => {
    it('should get true when all objectives are completed', () => {
        const objectives: ObjectiveDto[] = [
            {
                id: 1,
                name: 'string',
                mission_id: 1,
                user_id: null,
                completed: true,
                user_has_weapon: true,
                weapons: [],
                created_at: 'string',
                updated_at: 'string',
            },
            {
                id: 2,
                name: 'string',
                mission_id: 1,
                user_id: null,
                completed: true,
                user_has_weapon: true,
                weapons: [],
                created_at: 'string',
                updated_at: 'string',
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(true);
    });

    it('should get false when all objectives are incomplete', () => {
        const objectives: ObjectiveDto[] = [
            {
                id: 1,
                name: 'string',
                mission_id: 1,
                user_id: null,
                completed: false,
                user_has_weapon: true,
                weapons: [],
                created_at: 'string',
                updated_at: 'string',
            },
            {
                id: 2,
                name: 'string',
                mission_id: 1,
                user_id: null,
                completed: false,
                user_has_weapon: true,
                weapons: [],
                created_at: 'string',
                updated_at: 'string',
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(false);
    });

    it('should get false when one objective is incomplete', () => {
        const objectives: ObjectiveDto[] = [
            {
                id: 1,
                name: 'string',
                mission_id: 1,
                user_id: null,
                completed: false,
                user_has_weapon: true,
                weapons: [],
                created_at: 'string',
                updated_at: 'string',
            },
            {
                id: 2,
                name: 'string',
                mission_id: 1,
                user_id: null,
                completed: true,
                user_has_weapon: true,
                weapons: [],
                created_at: 'string',
                updated_at: 'string',
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(false);
    });
});

describe('Animals missions - getLasMission', () => {
    it('should return the first mission when it have one objective incomplete', () => {
        const missions: MissionDto[] = [
            {
                id: 1,
                name: '',
                reward: 100,
                hint: '',
                animal_id: 1,
                user_has_weapon: true,
                created_at: '',
                updated_at: '',
                objectives: [
                    {
                        id: 1,
                        name: '',
                        mission_id: 1,
                        user_id: 1,
                        completed: false,
                        user_has_weapon: true,
                        weapons: [],
                        created_at: '',
                        updated_at: '',
                    },
                ],
            },
            {
                id: 2,
                name: '',
                reward: 100,
                hint: '',
                animal_id: 1,
                user_has_weapon: true,
                created_at: '',
                updated_at: '',
                objectives: [
                    {
                        id: 2,
                        name: '',
                        mission_id: 1,
                        user_id: 1,
                        completed: false,
                        user_has_weapon: true,
                        weapons: [],
                        created_at: '',
                        updated_at: '',
                    },
                ],
            },
        ];

        const result = getLastMission(missions);

        expect(result).toEqual({
            id: 1,
            name: '',
            reward: 100,
            hint: '',
            animal_id: 1,
            user_has_weapon: true,
            created_at: '',
            updated_at: '',
            objectives: [
                {
                    id: 1,
                    name: '',
                    mission_id: 1,
                    user_id: 1,
                    completed: false,
                    user_has_weapon: true,
                    weapons: [],
                    created_at: '',
                    updated_at: '',
                },
            ],
        });
    });

    it('should return the second mission when the first mission objectives are completed', () => {

        const missions: MissionDto[] = [
            {
                id: 1,
                name: '',
                reward: 100,
                hint: '',
                animal_id: 1,
                user_has_weapon: true,
                created_at: '',
                updated_at: '',
                objectives: [
                    {
                        id: 1,
                        name: '',
                        mission_id: 1,
                        user_id: 1,
                        completed: true,
                        user_has_weapon: true,
                        weapons: [],
                        created_at: '',
                        updated_at: '',
                    },
                ],
            },
            {
                id: 2,
                name: '',
                reward: 100,
                hint: '',
                animal_id: 1,
                user_has_weapon: true,
                created_at: '',
                updated_at: '',
                objectives: [
                    {
                        id: 2,
                        name: '',
                        mission_id: 1,
                        user_id: 1,
                        completed: false,
                        user_has_weapon: true,
                        weapons: [],
                        created_at: '',
                        updated_at: '',
                    },
                ],
            },
        ];

        const result = getLastMission(missions);

        expect(result).toEqual({
            id: 2,
            name: '',
            reward: 100,
            hint: '',
            animal_id: 1,
            user_has_weapon: true,
            created_at: '',
            updated_at: '',
            objectives: [
                {
                    id: 2,
                    name: '',
                    mission_id: 1,
                    user_id: 1,
                    completed: false,
                    user_has_weapon: true,
                    weapons: [],
                    created_at: '',
                    updated_at: '',
                },
            ],
        });
    });
});

describe('Animals missions - getAnimalsLastMission', () => {
    it('should return animal info and last mission', () => {
        const animals: AnimalDto[] = [
            {
                id: 1,
                name: 'First animal',
                created_at: '',
                updated_at: '',
                missions: [
                    {
                        id: 1,
                        name: 'Mission 1',
                        reward: 100,
                        hint: '',
                        animal_id: 1,
                        user_has_weapon: true,
                        created_at: '',
                        updated_at: '',
                        objectives: [
                            {
                                id: 1,
                                name: '',
                                mission_id: 1,
                                user_id: 1,
                                completed: true,
                                weapons: [],
                                user_has_weapon: true,
                                created_at: '',
                                updated_at: '',
                            },
                        ],
                    },
                    {
                        id: 2,
                        name: 'Mission 2',
                        reward: 100,
                        hint: '',
                        animal_id: 1,
                        user_has_weapon: true,
                        created_at: '',
                        updated_at: '',
                        objectives: [
                            {
                                id: 2,
                                name: '',
                                mission_id: 2,
                                user_id: 1,
                                completed: false,
                                weapons: [],
                                user_has_weapon: true,
                                created_at: '',
                                updated_at: '',
                            },
                        ],
                    }
                ],
            },
            {
                id: 2,
                name: 'Second animal',
                created_at: '',
                updated_at: '',
                missions: [
                    {
                        id: 3,
                        name: 'Mission 1',
                        reward: 100,
                        hint: '',
                        animal_id: 2,
                        user_has_weapon: true,
                        created_at: '',
                        updated_at: '',
                        objectives: [
                            {
                                id: 3,
                                name: '',
                                mission_id: 2,
                                user_id: 1,
                                completed: false,
                                user_has_weapon: true,
                                weapons: [],
                                created_at: '',
                                updated_at: '',
                            },
                        ],
                    },
                    {
                        id: 4,
                        name: 'Mission 2',
                        reward: 100,
                        hint: '',
                        animal_id: 2,
                        user_has_weapon: true,
                        created_at: '',
                        updated_at: '',
                        objectives: [
                            {
                                id: 4,
                                name: '',
                                mission_id: 2,
                                user_id: 1,
                                completed: false,
                                user_has_weapon: true,
                                weapons: [],
                                created_at: '',
                                updated_at: '',
                            },
                        ],
                    }
                ],
            },
        ];

        const result = getAnimalsLastMission(animals);

        expect(result).toEqual([
            {
                id: 1,
                name: 'First animal',
                created_at: '',
                updated_at: '',
                mission: {
                    id: 2,
                    name: 'Mission 2',
                    reward: 100,
                    hint: '',
                    animal_id: 1,
                    user_has_weapon: true,
                    created_at: '',
                    updated_at: '',
                    objectives: [
                        {
                            id: 2,
                            name: '',
                            mission_id: 2,
                            user_id: 1,
                            completed: false,
                            weapons: [],
                            user_has_weapon: true,
                            created_at: '',
                            updated_at: '',
                        },
                    ],
                },
            },
            {
                id: 2,
                name: 'Second animal',
                created_at: '',
                updated_at: '',
                mission: {
                    id: 3,
                    name: 'Mission 1',
                    reward: 100,
                    hint: '',
                    animal_id: 2,
                    user_has_weapon: true,
                    created_at: '',
                    updated_at: '',
                    objectives: [
                        {
                            id: 3,
                            name: '',
                            mission_id: 2,
                            user_id: 1,
                            completed: false,
                            user_has_weapon: true,
                            weapons: [],
                            created_at: '',
                            updated_at: '',
                        },
                    ],
                },
            },
        ]);
    });

    it('should not return animal mission when it is all completed', () => {
        const animals: AnimalDto[] = [
            {
                id: 1,
                name: 'First animal',
                created_at: '',
                updated_at: '',
                missions: [
                    {
                        id: 1,
                        name: 'Mission 1',
                        reward: 100,
                        hint: '',
                        animal_id: 1,
                        user_has_weapon: true,
                        created_at: '',
                        updated_at: '',
                        objectives: [
                            {
                                id: 1,
                                name: '',
                                mission_id: 1,
                                user_id: 1,
                                completed: true,
                                weapons: [],
                                user_has_weapon: true,
                                created_at: '',
                                updated_at: '',
                            },
                        ],
                    },
                    {
                        id: 2,
                        name: 'Mission 2',
                        reward: 100,
                        hint: '',
                        animal_id: 1,
                        user_has_weapon: true,
                        created_at: '',
                        updated_at: '',
                        objectives: [
                            {
                                id: 2,
                                name: '',
                                mission_id: 2,
                                user_id: 1,
                                completed: false,
                                weapons: [],
                                user_has_weapon: true,
                                created_at: '',
                                updated_at: '',
                            },
                        ],
                    }
                ],
            },
            {
                id: 2,
                name: 'Second animal',
                created_at: '',
                updated_at: '',
                missions: [
                    {
                        id: 3,
                        name: 'Mission 1',
                        reward: 100,
                        hint: '',
                        animal_id: 2,
                        user_has_weapon: true,
                        created_at: '',
                        updated_at: '',
                        objectives: [
                            {
                                id: 3,
                                name: '',
                                mission_id: 2,
                                user_id: 1,
                                completed: true,
                                user_has_weapon: true,
                                weapons: [],
                                created_at: '',
                                updated_at: '',
                            },
                        ],
                    },
                    {
                        id: 4,
                        name: 'Mission 2',
                        reward: 100,
                        hint: '',
                        animal_id: 2,
                        user_has_weapon: true,
                        created_at: '',
                        updated_at: '',
                        objectives: [
                            {
                                id: 4,
                                name: '',
                                mission_id: 2,
                                user_id: 1,
                                completed: true,
                                user_has_weapon: true,
                                weapons: [],
                                created_at: '',
                                updated_at: '',
                            },
                        ],
                    }
                ],
            },
        ];

        const result = getAnimalsLastMission(animals);

        expect(result).toEqual([
            {
                id: 1,
                name: 'First animal',
                created_at: '',
                updated_at: '',
                mission: {
                    id: 2,
                    name: 'Mission 2',
                    reward: 100,
                    hint: '',
                    animal_id: 1,
                    user_has_weapon: true,
                    created_at: '',
                    updated_at: '',
                    objectives: [
                        {
                            id: 2,
                            name: '',
                            mission_id: 2,
                            user_id: 1,
                            completed: false,
                            weapons: [],
                            user_has_weapon: true,
                            created_at: '',
                            updated_at: '',
                        },
                    ],
                },
            },
        ]);
    });
});
