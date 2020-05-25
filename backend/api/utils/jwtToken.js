const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.sign = (data, options = { expiresIn: '5m' }) => jwt.sign(data, process.env.SECRET, options);
module.exports.verify = (token) => jwt.verify(token, process.env.SECRET);
