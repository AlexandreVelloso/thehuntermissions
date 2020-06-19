import userHasSomeObjectiveWeapon from '../../api/Utils/userHasSomeObjectiveWeapon';
import Weapon from '../../api/Models/Weapon';

describe('User Have All Objective Weapons', () => {
    it('should give true when weapons array is empty', () => {
        const result = userHasSomeObjectiveWeapon([]);

        expect(result).toBe(true);
    });

    it('should give true when user has 1 weapon', () => {
        const weapons: Weapon[] = [
            {
                id: 1,
                name: '',
                price: 1,
                created_at: '',
                updated_at: '',
                user_id: null,
                have_weapon: true,
            },
            {
                id: 2,
                name: '',
                price: 1,
                created_at: '',
                updated_at: '',
                user_id: null,
                have_weapon: false,
            },
        ];
        const result = userHasSomeObjectiveWeapon(weapons);

        expect(result).toBe(true);
    });

    it('should give false when user has no weapons', () => {
        const weapons = [
            {
                id: 1,
                name: '',
                price: 1,
                created_at: '',
                updated_at: '',
                user_id: null,
                have_weapon: false,
            },
            {
                id: 2,
                name: '',
                price: 1,
                created_at: '',
                updated_at: '',
                user_id: null,
                have_weapon: false,
            }
        ];
        const result = userHasSomeObjectiveWeapon(weapons);

        expect(result).toBe(false);
    });
});
