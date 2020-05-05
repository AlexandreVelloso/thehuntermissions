const User = require('../../database/models/User');
const SendResetEmailService = require('../services/SendResetEmailService');

module.exports = {
    async sendEmail(req, res) {
        const { email } = req.body;

        const user = await User.query()
            .where('email', email)
            .first();

        if (!user) {
            return res.status(400).json({
                error: 'Email not found',
            });
        }

        if (process.env.NODE_ENV === 'production') {
            await SendResetEmailService.sendEmailTo(email);
        }

        return res.status(200).end();
    },
};
