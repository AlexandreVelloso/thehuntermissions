const UserWeapon = require('../../database/models/UserWeapon');
const Weapon = require('../../database/models/Weapon');

module.exports = {
    async addWeapons(userId) {
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
    },
};
