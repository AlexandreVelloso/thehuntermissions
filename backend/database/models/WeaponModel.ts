import { Model } from 'objection';

class WeaponModel extends Model {
    id: any;
    name: any;
    price: any;
    user_id: any;
    have_weapon: any;
    created_at: any;
    updated_at: any;

    static get tableName() {
        return 'weapons';
    }
}

export default WeaponModel;
