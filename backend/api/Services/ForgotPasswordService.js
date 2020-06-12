const User = require('../../database/models/User');
const ValidationException = require('../Exceptions/ValidationException');
const SendResetEmailService = require('../Services/SendResetEmailService');

module.exports = {
    async sendEmail(userEmail) {
        const user = await User.query()
            .where('email', userEmail)
            .first();

        if (!user) {
            throw new ValidationException('Email not found');
        }

        if (process.env.NODE_ENV === 'production') {
            await SendResetEmailService.sendEmailTo(userEmail);
        }
    }
}