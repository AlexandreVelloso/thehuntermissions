import WeaponRepository from "./WeaponRepository";
import WeaponModel from "../../database/models/WeaponModel";

class WeaponRepositoryImpl implements WeaponRepository {

    async findById(weaponId: any): Promise<WeaponModel> {
        return await WeaponModel.query()
            .where('id', weaponId)
            .first();
    }

    async getWeaponsByUser(userId: any): Promise<WeaponModel[]> {
        return WeaponModel.query()
            .select('weapons.*', 'user_weapons.user_id', 'user_weapons.have_weapon')
            // eslint-disable-next-line func-names
            .leftJoin('user_weapons', function () {
                this.on('weapons.id', 'user_weapons.weapon_id')
                    .on('user_id', userId);
            });
    }

    async findWeaponByIdAndUser(weaponId: any, userId: any): Promise<WeaponModel> {
        return await WeaponModel.query()
            .select('weapons.*', 'user_weapons.user_id', 'user_weapons.have_weapon')
            // eslint-disable-next-line func-names
            .leftJoin('user_weapons', function () {
                this.on('weapons.id', 'user_weapons.weapon_id')
                    .on('user_id', userId);
            })
            .where('weapons.id', weaponId)
            .first();
    }

}

export default WeaponRepositoryImpl;