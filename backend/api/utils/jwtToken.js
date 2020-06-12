const jwt = require('jsonwebtoken');
require('dotenv').config();

const expiresIn = process.env.EXPIRES_IN || '365d';
const secret = process.env.SECRET || 'secret';

module.exports.sign = (data, options = { expiresIn }) => jwt.sign(data, secret, options);
module.exports.verify = (token) => jwt.verify(token, secret);
