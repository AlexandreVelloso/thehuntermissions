const { Model } = require('objection');

class WeaponAmmo extends Model {
    static get tableName() {
        return 'weapons_ammos';
    }
}

module.exports = WeaponAmmo;
