import BaseRepository from "./BaseRepository";
import EquipamentModel from "../../database/models/EquipamentModel";

interface EquipamentRepository extends BaseRepository<EquipamentModel> {

    getEquipamentByUser(userId: any): Promise<EquipamentModel[]>;

    findEquipamentByUser(equipamentId: number, userId: any): Promise<EquipamentModel>;

}

export default EquipamentRepository;