const Weapon = require('../../database/models/Weapon');
const UserWeapon = require('../../database/models/UserWeapon');

module.exports = {
    async index(req, res) {
        const { user } = req.auth;

        const weapons = await Weapon.query()
            .select('weapons.*', 'user_weapons.user_id', 'user_weapons.have_weapon')
            // eslint-disable-next-line func-names
            .leftJoin('user_weapons', function () {
                this.on('weapons.id', 'user_weapons.weapon_id')
                    .on('user_id', user.id);
            });

        return res.json(weapons);
    },

    async get(req, res) {
        const { id } = req.params;
        const { user } = req.auth;

        const weapon = await Weapon.query()
            .select('weapons.*', 'user_weapons.user_id', 'user_weapons.have_weapon')
            // eslint-disable-next-line func-names
            .leftJoin('user_weapons', function () {
                this.on('weapons.id', 'user_weapons.weapon_id')
                    .on('user_id', user.id);
            })
            .where('weapons.id', id)
            .first();

        if (!weapon) {
            return res.status(404)
                .json({
                    error: 'Weapon not found',
                });
        }

        return res.json(weapon);
    },

    async update(req, res) {
        const { id } = req.params;
        // eslint-disable-next-line camelcase
        const { have_weapon } = req.body;
        const { user } = req.auth;

        const weapon = await Weapon.query()
            .where('id', id)
            .first();

        if (!weapon) {
            return res.status(404)
                .json({
                    error: 'Weapon not found',
                });
        }

        const userWeapon = await UserWeapon.query()
            .where('weapon_id', id)
            .where('user_id', user.id)
            .first();

        if (userWeapon) {
            await UserWeapon.query()
                .where('weapon_id', id)
                .where('user_id', user.id)
                .patch({
                    have_weapon,
                });
        } else {
            await UserWeapon.query()
                .insert({
                    weapon_id: weapon.id,
                    user_id: user.id,
                    have_weapon,
                });
        }

        return res.status(204).end();
    },
};
