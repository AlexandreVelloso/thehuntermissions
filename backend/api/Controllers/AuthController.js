const AuthService = require('../Services/AuthService');

module.exports = {
    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const userCredentials = await AuthService.login(email, password);
            return res.json(userCredentials);
        } catch (err) {
            next(err);
        }
    },

    async register(req, res, next) {
        const { username, email, password } = req.body;

        try {
            const userCredentials = await AuthService.register(username, email, password);
            return res.json(userCredentials);
        } catch (err) {
            next(err);
        }
    },

    async resetPassword(req, res, next) {
        const { token, password, confirmPassword } = req.body;

        try {
            await AuthService.resetPassword(token, password, confirmPassword);
            return res.status(200).end();
        } catch (err) {
            next(err);
        }
    },

    async refreshToken(req, res, next) {
        const { refreshToken } = req.body;

        try {
            const userCredentials = await AuthService.refreshToken(refreshToken);
            return res.json(userCredentials);
        } catch (err) {
            next(err);
        }
    },

};
