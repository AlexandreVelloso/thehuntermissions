const {
    getAnimalsLastMission,
    getLastMission,
    isAllObjectivesCompleted,
} = require('../../api/utils/animalsMissions');

describe('Animals missions - isAllObjectivesCompleted', () => {
    it('should get true when all objectives are completed', () => {
        const objectives = [
            {
                id: 1,
                completed: 1,
            },
            {
                id: 2,
                completed: 1,
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(true);
    });

    it('should get false when all objectives are incomplete', () => {
        const objectives = [
            {
                id: 1,
                completed: 0,
            },
            {
                id: 2,
                completed: 0,
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(false);
    });

    it('should get false when one objective is incomplete', () => {
        const objectives = [
            {
                id: 1,
                completed: 0,
            },
            {
                id: 2,
                completed: 1,
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(false);
    });

    it('should get false when completed is null', () => {
        const objectives = [
            {
                id: 1,
                completed: null,
            },
            {
                id: 2,
                completed: 1,
            },
        ];

        const result = isAllObjectivesCompleted(objectives);
        expect(result).toBe(false);
    });
});

describe('Animals missions - getLasMission', () => {
    it('should return the first mission when it have one objective incomplete', () => {
        const missions = [
            {
                objectives: [
                    {
                        id: 1,
                        completed: 0,
                    },
                ],
            },
            {
                objectives: [
                    {
                        id: 2,
                        completed: 0,
                    },
                ],
            },
        ];

        const result = getLastMission(missions);

        expect(result).toEqual({
            objectives: [
                {
                    id: 1,
                    completed: 0,
                },
            ],
        });
    });

    it('should return the second mission when the first mission objectives are completed', () => {
        const missions = [
            {
                objectives: [
                    {
                        id: 1,
                        completed: 1,
                    },
                ],
            },
            {
                objectives: [
                    {
                        id: 2,
                        completed: 0,
                    },
                ],
            },
        ];

        const result = getLastMission(missions);

        expect(result).toEqual({
            objectives: [
                {
                    id: 2,
                    completed: 0,
                },
            ],
        });
    });
});

describe('Animals missions - getAnimalsLastMission', () => {
    it('should return animal info and last mission', () => {
        const animals = [
            {
                id: 1,
                name: 'First animal',
                created_at: '',
                updated_at: '',
                missions: [
                    {
                        name: 'Mission 1',
                        objectives: [
                            {
                                id: 1,
                                completed: 1,
                            },
                        ],
                    },
                    {
                        name: 'Mission 2',
                        objectives: [
                            {
                                id: 2,
                                completed: 0,
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                name: 'Second animal',
                created_at: '',
                updated_at: '',
                missions: [
                    {
                        name: 'Mission 1',
                        objectives: [
                            {
                                id: 3,
                                completed: 0,
                            },
                        ],
                    },
                    {
                        name: 'Mission 2',
                        objectives: [
                            {
                                id: 4,
                                completed: 1,
                            },
                        ],
                    },
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
                    name: 'Mission 2',
                    objectives: [
                        {
                            id: 2,
                            completed: 0,
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
                    name: 'Mission 1',
                    objectives: [
                        {
                            id: 3,
                            completed: 0,
                        },
                    ],
                },
            },
        ]);
    });

    it('should not return animal mission when it is all completed', () => {
        const animals = [
            {
                id: 1,
                name: 'First animal',
                created_at: '',
                updated_at: '',
                missions: [
                    {
                        name: 'Mission 1',
                        objectives: [
                            {
                                id: 1,
                                completed: 1,
                            },
                        ],
                    },
                    {
                        name: 'Mission 2',
                        objectives: [
                            {
                                id: 2,
                                completed: 0,
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                name: 'Second animal',
                created_at: '',
                updated_at: '',
                missions: [
                    {
                        name: 'Mission 1',
                        objectives: [
                            {
                                id: 3,
                                completed: 1,
                            },
                        ],
                    },
                    {
                        name: 'Mission 2',
                        objectives: [
                            {
                                id: 4,
                                completed: 1,
                            },
                        ],
                    },
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
                    name: 'Mission 2',
                    objectives: [
                        {
                            id: 2,
                            completed: 0,
                        },
                    ],
                },
            },
        ]);
    });
});
