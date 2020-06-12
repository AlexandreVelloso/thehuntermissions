import { Model } from 'objection';

class ObjectiveWeaponModel extends Model {
    objective_id?: number;
    weapon_id?: number;

    static get tableName() {
        return 'objectives_weapons';
    }
}

export default ObjectiveWeaponModel;
