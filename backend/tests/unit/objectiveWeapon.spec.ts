import {
    userHasSomeObjectiveWeapon,
    allObjectivesAreAvaliable,
} from '../../api/Utils/ObjectiveWeapons';
import WeaponDto from '../../api/Dtos/WeaponDto';
import ObjectiveDto from '../../api/Dtos/ObjectiveDto';

describe('User Have Some Objective Weapon', () => {
    it('should give true when weapons array is empty', () => {
        const result = userHasSomeObjectiveWeapon([]);

        expect(result).toBe(true);
    });

    it('should give true when user has 1 weapon', () => {
        const weapons: WeaponDto[] = [
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
        const weapons: WeaponDto[] = [
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

describe('All Objectives Are Avaliable', () => {
    it('should give true when user has all objectives weapons', () => {
        const objectives: ObjectiveDto[] = [
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
        ];

        const result = allObjectivesAreAvaliable(objectives);

        expect(result).toBe(true);
    });

    it('should give true when does not have all weapons', () => {
        const objectives: ObjectiveDto[] = [
            {
                id: 1,
                name: '',
                mission_id: 1,
                user_id: 1,
                completed: false,
                user_has_weapon: false,
                weapons: [],
                created_at: '',
                updated_at: '',
            },
            {
                id: 2,
                name: '',
                mission_id: 1,
                user_id: 1,
                completed: false,
                user_has_weapon: false,
                weapons: [],
                created_at: '',
                updated_at: '',
            },
        ];

        const result = allObjectivesAreAvaliable(objectives);

        expect(result).toBe(false);
    });

    it('should give true when only have 1 weapon', () => {
        const objectives: ObjectiveDto[] = [
            {
                id: 1,
                name: '',
                mission_id: 1,
                user_id: 1,
                completed: false,
                user_has_weapon: false,
                weapons: [],
                created_at: '',
                updated_at: '',
            },
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
        ];

        const result = allObjectivesAreAvaliable(objectives);

        expect(result).toBe(false);
    });
});
