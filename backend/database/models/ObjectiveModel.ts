import { Model } from 'objection';
import UserObjectiveModel from './UserObjectiveModel';
import WeaponModel from './WeaponModel';
import EquipamentModel from './EquipamentModel';

class ObjectiveModel extends Model {
    id: any;
    name: any;
    mission_id: any;
    user_id: any;
    completed: any;
    weapons: any;
    equipaments: any;
    created_at: any;
    updated_at: any;

    static get tableName() {
        return 'objectives';
    }

    static get relationMappings() {
        return {
            user_objectives: {
                relation: Model.HasManyRelation,
                modelClass: UserObjectiveModel,
                join: {
                    from: 'objectives.id',
                    to: 'user_objectives.objective_id',
                }
            },
            equipaments: {
                relation: Model.ManyToManyRelation,
                modelClass: EquipamentModel,
                join: {
                    from: 'objectives.id',
                    through: {
                        from: 'objectives_equipaments.objective_id',
                        to: 'objectives_equipaments.equipament_id'
                    },
                    to: 'equipaments.id'
                }
            },
            weapons: {
                relation: Model.ManyToManyRelation,
                modelClass: WeaponModel,
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

export default ObjectiveModel;
