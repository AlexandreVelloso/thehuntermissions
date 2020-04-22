const Weapon = require('../../database/models/Weapon');

module.exports = {
    async index(req, res) {
        const weapons = await Weapon.query();

        return res.json(weapons);
    },
};
