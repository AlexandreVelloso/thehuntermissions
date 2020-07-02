import UserWeaponRepository from '../../Repositories/UserWeaponRepository';
import WeaponRepository from '../../Repositories/WeaponRepository';
import WeaponModel from '../../../database/models/WeaponModel';
import StartWeaponsService from '../StartWeaponsService';

class StartWeaponsServiceImpl implements StartWeaponsService {

    private weaponRepository: WeaponRepository;
    private userWeaponRepository: UserWeaponRepository;

    public constructor(opts: any) {
        this.weaponRepository = opts.weaponRepository;
        this.userWeaponRepository = opts.userWeaponRepository;
    }

    async addWeapons(userId: number): Promise<void> {
        const weapons: WeaponModel[] = await this.weaponRepository
            .getWeaponsWhereNameIn([
                '12 GA Single Shot Shotgun',
                '243 Bolt Action Rifle'
            ]);

        for (let index = 0; index < weapons.length; index += 1) {
            await this.userWeaponRepository
                .insert(weapons[index].id, userId, true);
        }
    }
}

export default StartWeaponsServiceImpl;
