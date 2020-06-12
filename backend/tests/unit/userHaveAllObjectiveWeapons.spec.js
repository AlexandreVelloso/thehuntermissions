const userHaveAllObjectiveWeapons = require('../../api/utils/userHaveAllObjectiveWeapons');

describe('User Have All Objective Weapons', () => {
    it('should give true when weapons array is empty', () => {
        const result = userHaveAllObjectiveWeapons([]);

        expect(result).toBe(true);
    });

    it('should give true when user has 1 weapon', () => {
        const weapons = [
            { have_weapon: true },
            { have_weapon: false }
        ]
        const result = userHaveAllObjectiveWeapons(weapons);

        expect(result).toBe(true);
    });

    it('should give false when user has no weapons', () => {
        const weapons = [
            { have_weapon: false },
            { have_weapon: false }
        ]
        const result = userHaveAllObjectiveWeapons(weapons);

        expect(result).toBe(false);
    });
});
