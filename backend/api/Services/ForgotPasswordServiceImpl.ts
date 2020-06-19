import ValidationException from '../Exceptions/ValidationException';
import SendResetEmailService from './SendResetEmailService';
import UserRepository from '../Repositories/UserRepository';
import ForgorPasswordService from './ForgotPasswordService';

class ForgotPasswordServiceImpl implements ForgorPasswordService {

    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async sendEmail(userEmail: string): Promise<void> {
        const user = await this.userRepository
            .findByEmail(userEmail);

        if (!user) {
            throw new ValidationException('Email not found');
        }

        if (process.env.NODE_ENV === 'production') {
            await SendResetEmailService.sendEmailTo(userEmail);
        }
    }
}

export default ForgotPasswordServiceImpl;
