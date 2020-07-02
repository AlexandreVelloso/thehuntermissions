import { Model } from "objection";

class ObjectiveEquipamentModel extends Model {
    id: any;
    objective_id: any;
    equipament_id: any;

    static get tableName() {
        return 'objectives_equipaments';
    }
}

export default ObjectiveEquipamentModel;
