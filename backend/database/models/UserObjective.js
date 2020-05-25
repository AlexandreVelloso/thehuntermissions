const { Model } = require('objection');

class UserObjective extends Model {
    static get tableName() {
        return 'user_objectives';
    }
}

module.exports = UserObjective;
