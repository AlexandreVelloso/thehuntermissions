import BaseRepository from "./BaseRepository";
import WeaponModel from "../../database/models/WeaponModel";

interface WeaponRepository extends BaseRepository<WeaponModel> {

    getWeaponsByUser(userId: number): Promise<WeaponModel[]>;

    findWeaponByIdAndUser(weaponId: number, userId: number): Promise<WeaponModel>;
    
}

export default WeaponRepository;