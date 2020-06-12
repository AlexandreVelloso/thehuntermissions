const { Model } = require('objection');

class Objective extends Model {
    static get tableName() {
        return 'objectives';
    }

    static get relationMappings() {
        const UserObjective = require('./UserObjective');
        const Weapon = require('./Weapon');

        return {
            user_objectives: {
                relation: Model.HasManyRelation,
                modelClass: UserObjective,
                join: {
                    from: 'objectives.id',
                    to: 'user_objectives.objective_id'
                }
            },
            weapons: {
                relation: Model.ManyToManyRelation,
                modelClass: Weapon,
                join: {
                    from: 'objectives.id',
                    through: {
                        from: 'objectives_weapons.objective_id',
                        to: 'objectives_weapons.weapon_id',
                    },
                    to: 'weapons.id'
                }
            }
        }
    }
}

module.exports = Objective;
