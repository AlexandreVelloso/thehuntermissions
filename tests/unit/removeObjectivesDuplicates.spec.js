const {
    removeObjectivesDuplicates,
    removeDuplicates,
} = require('../../api/utils/removeObjectivesDuplicates');

describe('Remove duplicates - removeObjectivesDuplicates', () => {
    it('should remove objectives duplicates', () => {
        const objectives = [
            {
                id: 1,
                completed: true,
            },
            {
                id: 1,
                completed: true,
            },
            {
                id: 2,
                completed: false,
            },
        ];

        expect(
            removeObjectivesDuplicates(objectives),
        ).toEqual([
            {
                id: 1,
                completed: true,
            },
            {
                id: 2,
                completed: false,
            },
        ]);
    });
});

describe('Remove duplicates - removeDuplicates', () => {
    it('should remove objectives duplicates from one mission', () => {
        const mission = {
            objectives: [
                {
                    id: 1,
                    completed: true,
                },
                {
                    id: 1,
                    completed: true,
                },
                {
                    id: 2,
                    completed: false,
                },
            ],
        };

        expect(
            removeDuplicates(mission),
        ).toEqual({
            objectives: [
                {
                    id: 1,
                    completed: true,
                },
                {
                    id: 2,
                    completed: false,
                },
            ],
        });
    });

    it('should remove objectives duplicates from more various missions', () => {
        const mission = [
            {
                objectives: [
                    {
                        id: 1,
                        completed: true,
                    },
                    {
                        id: 1,
                        completed: true,
                    },
                    {
                        id: 2,
                        completed: false,
                    },
                ],
            },
            {
                objectives: [
                    {
                        id: 3,
                        completed: true,
                    },
                    {
                        id: 4,
                        completed: true,
                    },
                    {
                        id: 4,
                        completed: false,
                    },
                ],
            },
        ];

        expect(
            removeDuplicates(mission),
        ).toEqual([
            {
                objectives: [
                    {
                        id: 1,
                        completed: true,
                    },
                    {
                        id: 2,
                        completed: false,
                    },
                ],
            },
            {
                objectives: [
                    {
                        id: 3,
                        completed: true,
                    },
                    {
                        id: 4,
                        completed: false,
                    },
                ],
            },
        ]);
    });
});
