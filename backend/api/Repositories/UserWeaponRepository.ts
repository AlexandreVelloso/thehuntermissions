import BaseRepository from "./BaseRepository";
import UserWeaponModel from "../../database/models/UserWeaponModel";

interface UserWeaponRepository extends BaseRepository<UserWeaponModel> {

    findByWeaponAndUser(weaponId: number, userId: number): Promise<UserWeaponModel>

    update(weaponId: number, userId: number, haveWeapon: boolean): Promise<void>;

    insert(weaponId: number, userId: number, haveWeapon: boolean): Promise<void>;

}

export default UserWeaponRepository;