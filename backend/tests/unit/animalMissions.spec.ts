import {
    getAnimalsLastMission,
    getLastMission,
    isAllObjectivesCompleted,
} from '../../api/Utils/AnimalsMissions';
import Objective from '../../api/Models/Objective';
import Mission from '../../api/Models/Mission';
import Animal from '../../api/Models/Animal';

describe('Animals missions - isAllObjectivesCompleted', () => {
    it('should get true when all objectives are completed', () => {
        const objectives: Objective[] = [
            {
                id: 1,
                name: 'string',
                mission_id: 1,
                created_at: 'string',
                updated_at: 'string',
                user_id: null,
                completed: 1,
                weapons: [],
            },
            {
                id: 2,
                name: 'string',
                mission_id: 1,
                created_at: 'string',
                updated_at: 'string',
                user_id: null,
                completed: 1,
                weapons: [],
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(true);
    });

    it('should get false when all objectives are incomplete', () => {
        const objectives: Objective[] = [
            {
                id: 1,
                name: 'string',
                mission_id: 1,
                created_at: 'string',
                updated_at: 'string',
                user_id: null,
                completed: 0,
                weapons: [],
            },
            {
                id: 2,
                name: 'string',
                mission_id: 1,
                created_at: 'string',
                updated_at: 'string',
                user_id: null,
                completed: 0,
                weapons: [],
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(false);
    });

    it('should get false when one objective is incomplete', () => {
        const objectives: Objective[] = [
            {
                id: 1,
                name: 'string',
                mission_id: 1,
                created_at: 'string',
                updated_at: 'string',
                user_id: null,
                completed: 0,
                weapons: [],
            },
            {
                id: 2,
                name: 'string',
                mission_id: 1,
                created_at: 'string',
                updated_at: 'string',
                user_id: null,
                completed: 1,
                weapons: [],
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(false);
    });

    it('should get false when completed is null', () => {
        const objectives: Objective[] = [
            {
                id: 1,
                name: 'string',
                mission_id: 1,
                created_at: 'string',
                updated_at: 'string',
                user_id: null,
                completed: null,
                weapons: [],
            },
            {
                id: 2,
                name: 'string',
                mission_id: 1,
                created_at: 'string',
                updated_at: 'string',
                user_id: null,
                completed: 1,
                weapons: [],
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(false);
    });
});

describe('Animals missions - getLasMission', () => {
    it('should return the first mission when it have one objective incomplete', () => {
        const missions: Mission[] = [
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
                        created_at: '',
                        updated_at: '',
                        user_id: 1,
                        completed: 0,
                        weapons: []
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
                        created_at: '',
                        updated_at: '',
                        user_id: 1,
                        completed: 0,
                        weapons: []
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
                    created_at: '',
                    updated_at: '',
                    user_id: 1,
                    completed: 0,
                    weapons: []
                },
            ],
        });
    });

    it('should return the second mission when the first mission objectives are completed', () => {

        const missions: Mission[] = [
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
                        created_at: '',
                        updated_at: '',
                        user_id: 1,
                        completed: 1,
                        weapons: []
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
                        created_at: '',
                        updated_at: '',
                        user_id: 1,
                        completed: 0,
                        weapons: []
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
                    created_at: '',
                    updated_at: '',
                    user_id: 1,
                    completed: 0,
                    weapons: []
                },
            ],
        });
    });
});

describe('Animals missions - getAnimalsLastMission', () => {
    it('should return animal info and last mission', () => {
        const animals: Animal[] = [
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
                                created_at: '',
                                updated_at: '',
                                user_id: 1,
                                completed: 1,
                                weapons: [],
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
                                mission_id: 1,
                                created_at: '',
                                updated_at: '',
                                user_id: 1,
                                completed: 0,
                                weapons: [],
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
                                id: 3,
                                name: '',
                                mission_id: 1,
                                created_at: '',
                                updated_at: '',
                                user_id: 1,
                                completed: 0,
                                weapons: [],
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
                                id: 4,
                                name: '',
                                mission_id: 1,
                                created_at: '',
                                updated_at: '',
                                user_id: 1,
                                completed: 1,
                                weapons: [],
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
                            mission_id: 1,
                            created_at: '',
                            updated_at: '',
                            user_id: 1,
                            completed: 0,
                            weapons: [],
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
                            id: 3,
                            name: '',
                            mission_id: 1,
                            created_at: '',
                            updated_at: '',
                            user_id: 1,
                            completed: 0,
                            weapons: [],
                        },
                    ],
                },
            },
        ]);
    });

    it('should not return animal mission when it is all completed', () => {
        const animals: Animal[] = [
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
                                created_at: '',
                                updated_at: '',
                                user_id: 1,
                                completed: 1,
                                weapons: [],
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
                                mission_id: 1,
                                created_at: '',
                                updated_at: '',
                                user_id: 1,
                                completed: 0,
                                weapons: [],
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
                                id: 3,
                                name: '',
                                mission_id: 1,
                                created_at: '',
                                updated_at: '',
                                user_id: 1,
                                completed: 1,
                                weapons: [],
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
                                id: 4,
                                name: '',
                                mission_id: 1,
                                created_at: '',
                                updated_at: '',
                                user_id: 1,
                                completed: 1,
                                weapons: [],
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
                            mission_id: 1,
                            created_at: '',
                            updated_at: '',
                            user_id: 1,
                            completed: 0,
                            weapons: [],
                        },
                    ],
                },
            },
        ]);
    });
});
