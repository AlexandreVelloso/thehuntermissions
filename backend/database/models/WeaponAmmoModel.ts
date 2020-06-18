import { Model } from 'objection';

class WeaponAmmoModel extends Model {
    id?: number;
    ammo_id?: number;
    weapon_id?: number;

    static get tableName() {
        return 'weapons_ammos';
    }
}

export default WeaponAmmoModel;
