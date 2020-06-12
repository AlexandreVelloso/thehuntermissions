import { Model } from 'objection';

class UserObjectiveModel extends Model {
    completed: any;
    objective_id: any;
    user_id: any;

    static get tableName() {
        return 'user_objectives';
    }
}

export default UserObjectiveModel;
