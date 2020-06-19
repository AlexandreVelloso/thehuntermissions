import { Model } from 'objection';

class ObjectiveWeaponModel extends Model {
    id: any;
    objective_id: any;
    weapon_id: any;

    static get tableName() {
        return 'objectives_weapons';
    }
}

export default ObjectiveWeaponModel;
