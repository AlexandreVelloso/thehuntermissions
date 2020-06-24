import WeaponRepository from "../../../api/Repositories/WeaponRepository";

class MockWeaponRepository implements WeaponRepository {

    public findById(weaponId: number): any {
        if (weaponId <= 0 || weaponId > 1000) {
            return undefined;
        }

        return {
            id: 1,
            name: 'Weapon 1',
            price: 200,
            user_id: 1,
            have_weapon: 1,
            created_at: '',
            updated_at: '',
        };
    }

    public getWeaponsByUser(userId: number): any {
        return [
            {
                id: 1,
                name: 'Weapon 1',
                price: 100,
                user_id: userId,
                have_weapon: 1,
                created_at: '',
                updated_at: '',
            },
            {
                id: 2,
                name: 'Weapon 2',
                price: 200,
                user_id: userId,
                have_weapon: 1,
                created_at: '',
                updated_at: '',
            }
        ];
    }

    public getWeaponsWhereNameIn(weaponsNames: string[]): any {
        if (weaponsNames.length === 0) {
            return [];
        }

        return weaponsNames.map((weaponName, index) => {
            return {
                id: index + 1,
                name: weaponName,
                price: 100,
                user_id: 1,
                have_weapon: 1,
                created_at: '',
                updated_at: '',
            };
        });
    }

    public findWeaponByIdAndUser(weaponId: number, userId: number): any {
        if (weaponId <= 0 || weaponId > 1000) {
            return undefined;
        }

        return {
            id: 1,
            name: 'Weapon 1',
            price: 200,
            user_id: 1,
            have_weapon: 1,
            created_at: '',
            updated_at: '',
        };
    }

}

export default MockWeaponRepository;