import { Model } from "objection";

class EquipamentModel extends Model {
    id: any;
    name: any;
    price: any;
    user_id: any;
    have_equipament: any;
    created_at: any;
    updated_at: any;

    static get tableName() {
        return 'equipaments';
    }
}

export default EquipamentModel;
