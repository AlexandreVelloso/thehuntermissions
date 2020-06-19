import { Model } from 'objection';
import Objective from './ObjectiveModel';

class MissionModel extends Model {
    id: any;
    name: any;
    reward: any;
    hint: any;
    animal_id: any;
    objectives: any;
    created_at: any;
    updated_at: any;

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
