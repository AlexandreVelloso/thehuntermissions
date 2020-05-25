const { Model } = require('objection');
const Objective = require('./Objective');

class Mission extends Model {
    static get tableName() {
        return 'missions';
    }

    static relationMappings = {
        objectives: {
            relation: Model.HasManyRelation,
            modelClass: Objective,
            join: {
                from: 'missions.id',
                to: 'objectives.mission_id'
            }
        }
    };
}

module.exports = Mission;
