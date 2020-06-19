import UserWeaponRepository from "./UserWeaponRepository";
import UserWeaponModel from "../../database/models/UserWeaponModel";

class UserWeaponRepositoryImpl implements UserWeaponRepository {

    async findById(id: number): Promise<UserWeaponModel> {
        return await UserWeaponModel.query()
            .where('id', id)
            .first();
    }

    async findByWeaponAndUser(weaponId: number, userId: number): Promise<UserWeaponModel> {
        return await await UserWeaponModel.query()
            .where('weapon_id', weaponId)
            .where('user_id', userId)
            .first();
    }

    async update(weaponId: number, userId: number, haveWeapon: boolean): Promise<void> {
        await UserWeaponModel.query()
            .where('weapon_id', weaponId)
            .where('user_id', userId)
            .patch({
                have_weapon: haveWeapon,
            });
    }

    async insert(weaponId: number, userId: number, haveWeapon: boolean): Promise<void> {
        await UserWeaponModel.query()
            .insert({
                weapon_id: weaponId,
                user_id: userId,
                have_weapon: haveWeapon,
            });
    }

}

export default UserWeaponRepositoryImpl;