const Password = require('objection-password')();
const { Model } = require('objection');

class User extends Password(Model) {
    static get tableName() {
        return 'users';
    }

    static get useLimitInFirst() {
        return true;
    }
}

module.exports = User;
