const { Model } = require('objection');

class Ammo extends Model {
    static get tableName() {
        return 'ammos';
    }
}

module.exports = Ammo;
