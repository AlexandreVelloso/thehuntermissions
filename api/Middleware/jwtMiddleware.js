const jwt = require('../utils/jwtToken');

module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        const token = authorization.substring(7);
        const user = jwt.verify(token);

        req.auth = { user };

        return next();
    } catch (err) {
        return res.status(401).json({
            error: 'Invalid token',
        });
    }
};
