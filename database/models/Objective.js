const { Model } = require('objection');
const UserObjective = require('./UserObjective');

class Objective extends Model {
    static get tableName() {
        return 'objectives';
    }

    static relationMappings = {
        user_objectives: {
            relation: Model.HasManyRelation,
            modelClass: UserObjective,
            join: {
                from: 'objectives.id',
                to: 'user_objectives.objective_id'
            }
        }
    };
}

module.exports = Objective;
