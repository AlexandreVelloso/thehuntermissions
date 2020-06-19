import WeaponDto from "../Dtos/WeaponDto";

interface WeaponService {

    index(userId: number): Promise<WeaponDto[]>;

    get(weaponId: number, userId: number): Promise<WeaponDto>;

    update(weaponId: number, haveWeapon: boolean, userId: number): Promise<void>;

}

export default WeaponService;
