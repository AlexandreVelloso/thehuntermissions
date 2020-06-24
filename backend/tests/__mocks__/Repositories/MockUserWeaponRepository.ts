import UserWeaponRepository from "../../../api/Repositories/UserWeaponRepository";

class MockUserWeaponRepository implements UserWeaponRepository {

    findByWeaponAndUser(weaponId: number, userId: number): any {
        if (weaponId <= 0 || weaponId > 50) {
            return undefined;
        }

        return {
            weapon_id: 1,
            userId: 1,
            have_weapon: 0,
        }
    }

    update(weaponId: number, userId: number, haveWeapon: boolean): any { }

    insert(weaponId: number, userId: number, haveWeapon: boolean): any { }

    findById(id: number): any {
        return {
            weapon_id: 1,
            userId: 1,
            have_weapon: 0,
        }
    }

}

export default MockUserWeaponRepository;