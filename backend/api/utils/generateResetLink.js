const jwtToken = require('./jwtToken');

module.exports = (email) => {
    const token = jwtToken.sign({
        email,
    },
    {
        expiresIn: '10m',
    });

    let callbackPrefix;

    if (process.env.NODE_ENV === 'production') {
        callbackPrefix = 'https://thehuntermissions.herokuapp.com';
    } else {
        callbackPrefix = `http://localhost:${process.env.PORT}`;
    }

    return `${callbackPrefix}/reset-password?resetToken=${token}`;
};
