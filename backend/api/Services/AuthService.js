const randtoken = require('rand-token');

const User = require('../../database/models/User');
const jwtToken = require('../utils/jwtToken');
const ValidationException = require("../Exceptions/ValidationException");
const UnauthorizedOperationException = require("../Exceptions/UnauthorizedOperationException");
const StartWeaponsService = require('../Services/StartWeaponsService');

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
    async login(email, password) {
        const user = await User.query()
            .where('email', email)
            .first();

        if (!user || !await user.verifyPassword(password)) {
            throw new ValidationException('Username or password incorrect');
        }

        return generateUserResponse(user);
    },

    async register(username, email, password) {
        const userDB = await User.query()
            .where('email', email)
            .first();

        if (userDB) {
            throw new ValidationException('Email already exists');
        }

        const refreshToken = randtoken.uid(256);

        const user = await User.query()
            .insert({
                email,
                username,
                password,
                refresh_token: refreshToken,
            });

        await StartWeaponsService.addWeapons(user.id);

        return generateUserResponse(user);
    },

    async resetPassword(token, password, confirmPassword) {
        let email;

        try {
            email = jwtToken.verify(token).email;
        } catch (err) {
            throw new ValidationException('Invalid token');
        }

        if (password !== confirmPassword) {
            throw new ValidationException('The passwords doesn\'t match');
        }

        const user = await User.query()
            .where('email', email)
            .first();

        if (!user) {
            throw new ValidationException('User not found');
        }

        await User.query()
            .where('email', email)
            .patch({
                password,
            });
    },

    async refreshToken(refreshToken) {
        const user = await User.query()
            .where('refresh_token', refreshToken)
            .first();

        if (!user) {
            throw new UnauthorizedOperationException('Invalid refresh token');
        }

        return generateUserResponse(user);
    }
}