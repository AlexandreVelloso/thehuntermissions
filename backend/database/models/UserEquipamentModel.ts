import { Model } from "objection";

class UserEquipamentModel extends Model {
    equipament_id: any;
    user_id: any;
    have_equipament: any;

    static get tableName(){
        return 'user_equipaments';
    }
}

export default UserEquipamentModel;
