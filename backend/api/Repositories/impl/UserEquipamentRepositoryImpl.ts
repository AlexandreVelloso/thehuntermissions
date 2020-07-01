import UserEquipamentRepository from "../UserEquipamentRepository";
import UserEquipamentModel from "../../../database/models/UserEquipamentModel";

class UserEquipamentRepositoryImpl implements UserEquipamentRepository {

    async findById(id: number): Promise<UserEquipamentModel> {
        return UserEquipamentModel.query()
            .findById(id);
    }

    async findByEquipamentAndUser(equipamentId: number, userId: number): Promise<UserEquipamentModel> {
        return UserEquipamentModel.query()
            .where('equipament_id', equipamentId)
            .where('user_id', userId)
            .first();
    }

    async insert(equipamentId: number, userId: number, haveEquipament: boolean): Promise<void> {
        await UserEquipamentModel.transaction(async trx => {
            await UserEquipamentModel.query(trx)
                .insert({
                    equipament_id: equipamentId,
                    user_id: userId,
                    have_equipament: haveEquipament,
                });
        });
    }

    async update(equipamentId: number, userId: number, haveEquipament: boolean): Promise<void> {
        await UserEquipamentModel.transaction(async trx => {
            await UserEquipamentModel.query(trx)
                .where('equipament_id', equipamentId)
                .where('user_id', userId)
                .patch({
                    have_equipament: haveEquipament,
                });
        });
    }
}

export default UserEquipamentRepositoryImpl;