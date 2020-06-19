import WeaponService from "./WeaponService";
import EntityNotFoundException from "../Exceptions/EntityNotFoundException";
import WeaponRepository from "../Repositories/WeaponRepository";
import UserWeaponRepository from "../Repositories/UserWeaponRepository";
import WeaponModel from "../../database/models/WeaponModel";
import WeaponDto from "../Dtos/WeaponDto";
import UserWeaponModel from "../../database/models/UserWeaponModel";

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

    public async index(userId: number): Promise<WeaponDto[]> {
        const weapons: WeaponModel[] = await this.weaponRepository
            .getWeaponsByUser(userId);

        return WeaponDto.toDto(weapons);
    }

    public async get(weaponId: number, userId: number): Promise<WeaponDto> {
        const weapon: WeaponModel = await this.weaponRepository
            .findWeaponByIdAndUser(weaponId, userId);

        if (!weapon) {
            throw new EntityNotFoundException('Weapon not found');
        }

        return WeaponDto.toDto(weapon);
    }

    public async update(weaponId: number, haveWeapon: boolean, userId: number): Promise<void> {
        const weapon: WeaponModel = await this.weaponRepository
            .findById(weaponId);

        if (!weapon) {
            throw new EntityNotFoundException('Weapon not found');
        }

        const userWeapon: UserWeaponModel = await this.userWeaponRepository
            .findByWeaponAndUser(weaponId, userId);

        if (userWeapon) {
            await this.userWeaponRepository
                .update(weaponId, userId, haveWeapon);
        } else {
            await this.userWeaponRepository
                .insert(weaponId, userId, haveWeapon);
        }
    }

}

export default WeaponServiceImpl;