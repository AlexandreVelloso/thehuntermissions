import { Model } from 'objection';

class AmmoModel extends Model {
    id: any;

    static get tableName() {
        return 'ammos';
    }
}

export default AmmoModel;
