import WeaponService from '../../api/Services/WeaponService';
import WeaponServiceImpl from '../../api/Services/impl/WeaponServiceImpl';

import MockWeaponRepository from '../__mocks__/Repositories/MockWeaponRepository';
import MockUserWeaponRepository from '../__mocks__/Repositories/MockUserWeaponRepository';
import EntityNotFoundException from '../../api/Exceptions/EntityNotFoundException';

let weaponService: WeaponService;

beforeAll(() => {
    weaponService = new WeaponServiceImpl({
        weaponRepository: new MockWeaponRepository(),
        userWeaponRepository: new MockUserWeaponRepository(),
    });
});

describe('Weapons Service - Index', () => {
    it('should list all weapons for a user', async () => {
        const result = await weaponService.index(1);

        expect(result)
            .toEqual([
                {
                    id: 1,
                    name: 'Weapon 1',
                    price: 100,
                    user_id: 1,
                    have_weapon: true,
                    created_at: '',
                    updated_at: ''
                },
                {
                    id: 2,
                    name: 'Weapon 2',
                    price: 200,
                    user_id: 1,
                    have_weapon: true,
                    created_at: '',
                    updated_at: ''
                }
            ]);
    });
});

describe('Weapons Service - Get', () => {
    it('should retrieve a weapon from a user', async () => {
        const weaponId = 1;
        const userId = 1;

        const result = await weaponService.get(weaponId, userId);

        expect(result)
            .toEqual({
                id: weaponId,
                name: 'Weapon 1',
                price: 200,
                user_id: userId,
                have_weapon: true,
                created_at: '',
                updated_at: '',
            });
    });

    it('should throw exception when weapon not found', async () => {
        const weaponId = 0;
        const userId = 1;

        expect(weaponService.get(weaponId, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Weapon not found'));
    });
});

describe('Weapons Service - Update', () => {
    it('should update a weapon when user have weapon', async () => {
        const weaponId = 1;
        const haveWeapon = true;
        const userId = 1;

        expect(weaponService.update(weaponId, haveWeapon, userId))
            .resolves
            .toBe(undefined);
    });

    it('should update a weapon when user does not have weapon', async () => {
        const weaponId = 2;
        const haveWeapon = true;
        const userId = 1;

        expect(weaponService.update(weaponId, haveWeapon, userId))
            .resolves
            .toBe(undefined);
    });

    it('should throw exception when not found weapon', async () => {
        const weaponId = 0;
        const haveWeapon = true;
        const userId = 1;

        expect(weaponService.update(weaponId, haveWeapon, userId))
            .rejects
            .toEqual(new EntityNotFoundException('Weapon not found'));
    });
});