const randtoken = require('rand-token');
const jwtToken = require('../utils/jwtToken');
const User = require('../../database/models/User');
const startWeaponsService = require('../services/StartWeaponsService');

const generateToken = (user) => jwtToken.sign({
    id: user.id,
    username: user.username,
    email: user.email,
});

const generateUserResponse = (user) => {
    const accessToken = `Bearer ${generateToken(user)}`;

    return {
        user: {
            username: user.username,
            email: user.email,
        },
        accessToken,
        refreshToken: user.refresh_token,
    };
};

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

        return res.json(generateUserResponse(user));
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

        const refreshToken = randtoken.uid(256);

        const user = await User.query()
            .insert({
                email,
                username,
                password,
                refresh_token: refreshToken,
            });

        await startWeaponsService.addWeapons(user.id);

        return res.json(generateUserResponse(user));
    },

    async resetPassword(req, res) {
        const { token, password, confirmPassword } = req.body;

        let email;

        try {
            email = jwtToken.verify(token).email;
        } catch (err) {
            return res.status(400).json({
                error: 'Invalid token',
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                error: 'The passwords doesn\'t match',
            });
        }

        const user = await User.query()
            .where('email', email)
            .first();

        if (!user) {
            return res.status(400).json({
                error: 'User not found',
            });
        }

        await User.query()
            .where('email', email)
            .patch({
                password,
            });

        return res.status(200).end();
    },

    async refreshToken(req, res) {
        const { refreshToken } = req.body;

        const user = await User.query()
            .where('refresh_token', refreshToken)
            .first();

        if (!user) {
            return res.status(401).json({
                error: 'Invalid refresh token',
            });
        }

        return res.json(generateUserResponse(user));
    },

};
