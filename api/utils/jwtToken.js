const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.sign = (data, options = { expiresIn: '1d' }) => jwt.sign(data, process.env.SECRET, options);
module.exports.verify = (token) => jwt.verify(token, process.env.SECRET);
