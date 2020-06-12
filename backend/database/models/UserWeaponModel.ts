import { Model } from 'objection';

class UserWeaponModel extends Model {
    weapon_id: any;
    user_id: any;
    have_weapon: any;

    static get tableName() {
        return 'user_weapons';
    }
}

export default UserWeaponModel;
