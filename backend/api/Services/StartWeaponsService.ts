import UserWeapon from '../../database/models/UserWeaponModel';
import Weapon from '../../database/models/WeaponModel';

class StartWeaponsService {
    static async addWeapons(userId: string) {
        const weapons = await Weapon.query()
            .whereIn('name', [
                '12 GA Single Shot Shotgun',
                '243 Bolt Action Rifle',
            ]);

        await weapons.forEach(async (weapon) => {
            await UserWeapon.query()
                .insert({
                    weapon_id: weapon.id,
                    user_id: userId,
                    have_weapon: true,
                });
        });
    }
}

export default StartWeaponsService;
