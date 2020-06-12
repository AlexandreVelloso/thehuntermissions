const Password = require('objection-password')();
import { Model } from 'objection';

class UserModel extends Password(Model) {
    static get tableName() {
        return 'users';
    }

    static get useLimitInFirst() {
        return true;
    }
}

export default UserModel;
