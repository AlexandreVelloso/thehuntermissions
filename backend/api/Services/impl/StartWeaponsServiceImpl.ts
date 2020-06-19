import UserWeaponRepository from '../../Repositories/UserWeaponRepository';
import WeaponRepository from '../../Repositories/WeaponRepository';
import WeaponModel from '../../../database/models/WeaponModel';

class StartWeaponsServiceImpl {

    private weaponRepository: WeaponRepository;
    private userWeaponRepository: UserWeaponRepository;

    public constructor(
        weaponRepository: WeaponRepository,
        userWeaponRepository: UserWeaponRepository
    ) {
        this.weaponRepository = weaponRepository;
        this.userWeaponRepository = userWeaponRepository;
    }

    async addWeapons(userId: number): Promise<void> {
        const weapons: WeaponModel[] = await this.weaponRepository
            .getWeaponsWhereNameIn([
                '12 GA Single Shot Shotgun',
                '243 Bolt Action Rifle'
            ]);

        await weapons.forEach(async (weapon) => {
            await this.userWeaponRepository
                .insert(weapon.id, userId, true);
        });
    }
}

export default StartWeaponsServiceImpl;
