const { Model } = require('objection');
const Mission = require('./Mission');

class Animal extends Model {
    static get tableName() {
        return 'animals';
    }

    static relationMappings = {
        missions: {
            relation: Model.HasManyRelation,
            modelClass: Mission,
            join: {
                from: 'animals.id',
                to: 'missions.animal_id'
            }
        }
    };
}

module.exports = Animal;
