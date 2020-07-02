import BaseRepository from "./BaseRepository";
import UserEquipamentModel from "../../database/models/UserEquipamentModel";

interface UserEquipamentRepository extends BaseRepository<UserEquipamentModel> {

    findByEquipamentAndUser(equipamentId: number, userId: number): Promise<UserEquipamentModel>;

    update(equipamentId: number, userId: number, haveEquipament: boolean): Promise<void>;

    insert(equipamentId: number, userId: number, haveEquipament: boolean): Promise<void>;

}

export default UserEquipamentRepository;