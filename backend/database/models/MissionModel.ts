import { Model } from 'objection';
import Objective from './ObjectiveModel';

class MissionModel extends Model {
    id?: number;
    objectives: any;
    user_has_weapon: any;

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

export default MissionModel;
