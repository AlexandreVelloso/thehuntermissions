const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.sign = (data) => jwt.sign(data, process.env.SECRET, { expiresIn: '1d' });
module.exports.verify = (token) => jwt.verify(token, process.env.SECRET);
