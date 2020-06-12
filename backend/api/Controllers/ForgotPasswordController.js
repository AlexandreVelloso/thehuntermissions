const ForgotPasswordService = require('../Services/ForgotPasswordService');

module.exports = {
    async sendEmail(req, res, next) {
        const { email = '' } = req.body;

        try{
            await ForgotPasswordService.sendEmail(email);
            return res.status(200).end();
        }catch(err){
            next(err);
        }
    },
};
