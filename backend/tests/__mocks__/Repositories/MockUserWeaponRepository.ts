import UserWeaponRepository from "../../../api/Repositories/UserWeaponRepository";

class MockUserWeaponRepository implements UserWeaponRepository {

    public findByWeaponAndUser(weaponId: number, userId: number): any {
        if (weaponId <= 0 || weaponId > 50) {
            return undefined;
        }

        return {
            weapon_id: 1,
            userId: 1,
            have_weapon: 0,
        }
    }

    public update(weaponId: number, userId: number, haveWeapon: boolean): any { }

    public insert(weaponId: number, userId: number, haveWeapon: boolean): any { }

    public findById(id: number): any {
        return {
            weapon_id: 1,
            userId: 1,
            have_weapon: 0,
        }
    }

}

export default MockUserWeaponRepository;