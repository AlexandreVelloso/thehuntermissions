const { Model } = require('objection');

class Weapon extends Model {
    static get tableName() {
        return 'weapons';
    }
}

module.exports = Weapon;
