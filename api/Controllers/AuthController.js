const jwtToken = require('../utils/jwtToken');
const User = require('../../database/models/User');

const generateToken = (user) => jwtToken.sign({
    id: user.id,
    username: user.username,
    email: user.email,
});

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.query()
            .where('email', email)
            .first();

        if (!user || !await user.verifyPassword(password)) {
            return res.status(400).json({
                error: 'Username or password incorrect',
            });
        }

        const accessToken = `Bearer ${generateToken(user)}`;

        return res.json({
            user: {
                username: user.username,
                email: user.email,
            },
            accessToken,
        });
    },

    async register(req, res) {
        const { username, email, password } = req.body;

        const userDB = await User.query()
            .where('email', email)
            .first();

        if (userDB) {
            return res.status(400).json({
                error: 'Email already exists',
            });
        }

        const user = await User.query()
            .insert({
                email,
                username,
                password,
            });

        const accessToken = `Bearer ${generateToken(user)}`;

        return res.json({
            user: {
                username,
                email,
            },
            accessToken,
        });
    },

};
