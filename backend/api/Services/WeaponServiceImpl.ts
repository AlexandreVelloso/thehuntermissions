import WeaponService from "./WeaponService";
import EntityNotFoundException from "../Exceptions/EntityNotFoundException";
import WeaponRepository from "../Repositories/WeaponRepository";
import UserWeaponRepository from "../Repositories/UserWeaponRepository";

class WeaponServiceImpl implements WeaponService {

    private weaponRepository: WeaponRepository;
    private userWeaponRepository: UserWeaponRepository;

    public constructor(
        weaponRepository: WeaponRepository,
        userWeaponRepository: UserWeaponRepository,
    ) {
        this.weaponRepository = weaponRepository;
        this.userWeaponRepository = userWeaponRepository;
    }

    public async index(userId: number): Promise<any[]> {
        return await this.weaponRepository
            .getWeaponsByUser(userId);
    }

    public async get(weaponId: number, userId: number): Promise<any> {
        const weapon = await this.weaponRepository
            .findWeaponByIdAndUser(weaponId, userId);

        if (!weapon) {
            throw new EntityNotFoundException('Weapon not found');
        }

        return weapon;
    }

    public async update(weaponId: number, haveWeapon: boolean, userId: number): Promise<void> {
        const weapon = await this.weaponRepository
            .findById(weaponId);

        if (!weapon) {
            throw new EntityNotFoundException('Weapon not found');
        }

        const userWeapon = await this.userWeaponRepository
            .findByWeaponAndUser(weaponId, userId);

        if (userWeapon) {
            await this.userWeaponRepository
                .update(weapon.id, userId, haveWeapon);
        } else {
            await this.userWeaponRepository
                .insert(weapon.id, userId, haveWeapon);
        }
    }

}

export default WeaponServiceImpl;