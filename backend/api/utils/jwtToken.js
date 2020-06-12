const jwt = require('jsonwebtoken');
require('dotenv').config();

let expiresIn = '5m';

if (process.env.NODE_ENV !== 'production') {
    expiresIn = '365d';
}

const secret = process.env.SECRET || 'secret';

module.exports.sign = (data, options = { expiresIn }) => jwt.sign(data, secret, options);
module.exports.verify = (token) => jwt.verify(token, secret);
