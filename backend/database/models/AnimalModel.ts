import { Model } from 'objection';
import Mission from './MissionModel';

class AnimalModel extends Model {
    id: any;
    name: any;
    created_at: any;
    updated_at: any;
    missions: any;
    mission: any;

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

export default AnimalModel;
