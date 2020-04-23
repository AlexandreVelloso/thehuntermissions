const { Model } = require('objection');

class ObjectiveWeapon extends Model {
    static get tableName() {
        return 'objectives_weapons';
    }
}

module.exports = ObjectiveWeapon;
