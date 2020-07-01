import EquipamentRepository from "../EquipamentRepository";
import EquipamentModel from "../../../database/models/EquipamentModel";

class EquipamentRepositoryImpl implements EquipamentRepository {

    async findById(equipamentId: number): Promise<EquipamentModel> {
        return await EquipamentModel.query()
            .where('id', equipamentId)
            .first();
    }

    async findEquipamentByUser(equipamentId: number, userId: any): Promise<EquipamentModel> {
        return await EquipamentModel.query()
            .select('equipaments.*', 'user_equipaments.user_id', 'user_equipaments.have_equipament')
            // eslint-disable-next-line func-names
            .leftJoin('user_equipaments', function () {
                this.on('equipaments.id', 'user_equipaments.equipament_id')
                    .on('user_id', userId);
            })
            .where('equipaments.id', equipamentId)
            .first();
    }

    async getEquipamentByUser(userId: any): Promise<EquipamentModel[]> {
        return await EquipamentModel.query()
            .select('equipaments.*', 'user_equipaments.user_id', 'user_equipaments.have_equipament')
            // eslint-disable-next-line func-names
            .leftJoin('user_equipaments', function () {
                this.on('equipaments.id', 'user_equipaments.equipament_id')
                    .on('user_id', userId);
            });
    }

}

export default EquipamentRepositoryImpl;