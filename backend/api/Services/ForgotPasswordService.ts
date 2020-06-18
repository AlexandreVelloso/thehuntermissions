import User from '../../database/models/UserModel';
import ValidationException from '../Exceptions/ValidationException';
import SendResetEmailService from './SendResetEmailService';

class ForgotPasswordService {
    static async sendEmail(userEmail: string) {
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

export default ForgotPasswordService;
