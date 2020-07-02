import {
    userHasSomeObjectiveEquipament,
    allObjectivesEquipamentsAreAvaliable,
} from '../../api/Utils/ObjectiveEquipaments';
import ObjectiveDto from '../../api/Dtos/ObjectiveDto';
import EquipamentDto from '../../api/Dtos/EquipamentDto';

describe('User Have Some Objective Weapon', () => {
    it('should give true when weapons array is empty', () => {
        const result = userHasSomeObjectiveEquipament([]);

        expect(result).toBe(true);
    });

    it('should give true when user has 1 weapon', () => {
        const weapons: EquipamentDto[] = [
            {
                id: 1,
                name: '',
                price: 1,
                created_at: '',
                updated_at: '',
                user_id: null,
                have_equipament: true,
            },
            {
                id: 2,
                name: '',
                price: 1,
                created_at: '',
                updated_at: '',
                user_id: null,
                have_equipament: false,
            },
        ];
        const result = userHasSomeObjectiveEquipament(weapons);

        expect(result).toBe(true);
    });

    it('should give false when user has no weapons', () => {
        const weapons: EquipamentDto[] = [
            {
                id: 1,
                name: '',
                price: 1,
                created_at: '',
                updated_at: '',
                user_id: null,
                have_equipament: false,
            },
            {
                id: 2,
                name: '',
                price: 1,
                created_at: '',
                updated_at: '',
                user_id: null,
                have_equipament: false,
            }
        ];

        const result = userHasSomeObjectiveEquipament(weapons);

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
                user_has_equipament: true,
                weapons: [],
                equipaments: [],
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
                user_has_equipament: true,
                weapons: [],
                equipaments: [],
                created_at: '',
                updated_at: '',
            },
        ];

        const result = allObjectivesEquipamentsAreAvaliable(objectives);

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
                user_has_equipament: false,
                weapons: [],
                equipaments: [],
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
                user_has_equipament: false,
                weapons: [],
                equipaments: [],
                created_at: '',
                updated_at: '',
            },
        ];

        const result = allObjectivesEquipamentsAreAvaliable(objectives);

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
                user_has_equipament: false,
                weapons: [],
                equipaments: [],
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
                user_has_equipament: true,
                weapons: [],
                equipaments: [],
                created_at: '',
                updated_at: '',
            },
        ];

        const result = allObjectivesEquipamentsAreAvaliable(objectives);

        expect(result).toBe(false);
    });
});
