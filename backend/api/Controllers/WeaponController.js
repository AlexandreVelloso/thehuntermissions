const WeaponService = require('../Services/WeaponService');

module.exports = {
    async index(req, res, next) {
        const { user } = req.auth;

        try {
            const weapons = await WeaponService.index(user.id);
            return res.json(weapons);
        } catch (err) {
            next(err);
        }
    },

    async get(req, res, next) {
        const { id } = req.params;
        const { user } = req.auth;

        try {
            const weapon = await WeaponService.get(id, user.id);
            return res.json(weapon);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        const { id } = req.params;
        const { have_weapon: haveWeapon } = req.body;
        const { user } = req.auth;

        try {
            await WeaponService.update(id, haveWeapon, user.id);
            return res.status(204).end();
        } catch (err) {
            next(err);
        }

    },
};
