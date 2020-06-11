const Weapon = require('../../database/models/Weapon');
const UserWeapon = require('../../database/models/UserWeapon');
const EntityNotFoundException = require('../Exceptions/EntityNotFoundException');

module.exports = {
    async index(userId) {
        const weapons = await Weapon.query()
            .select('weapons.*', 'user_weapons.user_id', 'user_weapons.have_weapon')
            // eslint-disable-next-line func-names
            .leftJoin('user_weapons', function () {
                this.on('weapons.id', 'user_weapons.weapon_id')
                    .on('user_id', userId);
            });

        return weapons;
    },

    async get(weaponId, userId) {
        const weapon = await Weapon.query()
            .select('weapons.*', 'user_weapons.user_id', 'user_weapons.have_weapon')
            // eslint-disable-next-line func-names
            .leftJoin('user_weapons', function () {
                this.on('weapons.id', 'user_weapons.weapon_id')
                    .on('user_id', userId);
            })
            .where('weapons.id', weaponId)
            .first();

        if (!weapon) {
            throw new EntityNotFoundException('Weapon not found');
        }

        return weapon;
    },

    async update(weaponId, haveWeapon, userId) {
        const weapon = await Weapon.query()
            .where('id', weaponId)
            .first();

        if (!weapon) {
            throw new EntityNotFoundException('Weapon not found');
        }

        const userWeapon = await UserWeapon.query()
            .where('weapon_id', weaponId)
            .where('user_id', userId)
            .first();

        if (userWeapon) {
            await UserWeapon.query()
                .where('weapon_id', weaponId)
                .where('user_id', userId)
                .patch({
                    have_weapon: haveWeapon,
                });
        } else {
            await UserWeapon.query()
                .insert({
                    weapon_id: weapon.id,
                    user_id: userId,
                    have_weapon: haveWeapon,
                });
        }
    }
}