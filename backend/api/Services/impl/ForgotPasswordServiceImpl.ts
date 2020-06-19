import ValidationException from '../../Exceptions/ValidationException';
import SendResetEmailService from '../SendResetEmailService';
import UserRepository from '../../Repositories/UserRepository';
import ForgorPasswordService from '../ForgotPasswordService';

class ForgotPasswordServiceImpl implements ForgorPasswordService {

    private userRepository: UserRepository;
    private sendResetEmailService: SendResetEmailService;

    public constructor(
        userRepository: UserRepository,
        sendResetEmailService: SendResetEmailService,
    ) {
        this.userRepository = userRepository;
        this.sendResetEmailService = sendResetEmailService;
    }

    async sendEmail(userEmail: string): Promise<void> {
        const user = await this.userRepository
            .findByEmail(userEmail);

        if (!user) {
            throw new ValidationException('Email not found');
        }

        if (process.env.NODE_ENV === 'production') {
            await this.sendResetEmailService
                .sendEmailTo(userEmail);
        }
    }
}

export default ForgotPasswordServiceImpl;
