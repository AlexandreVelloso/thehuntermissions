const { Model } = require('objection');

class UserWeapon extends Model {
    static get tableName() {
        return 'user_weapons';
    }
}

module.exports = UserWeapon;
