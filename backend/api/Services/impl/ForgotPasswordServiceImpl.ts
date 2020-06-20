import ValidationException from '../../Exceptions/ValidationException';
import SendResetEmailService from '../SendResetEmailService';
import UserRepository from '../../Repositories/UserRepository';
import ForgorPasswordService from '../ForgotPasswordService';

class ForgotPasswordServiceImpl implements ForgorPasswordService {

    private userRepository: UserRepository;
    private sendResetEmailService: SendResetEmailService;

    public constructor(opts: any) {
        this.userRepository = opts.userRepository;
        this.sendResetEmailService = opts.sendResetEmailService;
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
