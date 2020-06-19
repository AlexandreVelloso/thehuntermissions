interface WeaponService {

    index(userId: number): Promise<any[]>;

    get(weaponId: number, userId: number): Promise<any>;

    update(weaponId: number, haveWeapon: boolean, userId: number): Promise<void>;

}

export default WeaponService;
