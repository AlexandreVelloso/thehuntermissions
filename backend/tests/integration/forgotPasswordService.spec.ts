import ForgotPasswordService from '../../api/Services/ForgotPasswordService';
import ForgotPasswordServiceImpl from '../../api/Services/impl/ForgotPasswordServiceImpl';
import ValidationException from '../../api/Exceptions/ValidationException';

import MockSendResetEmailService from '../__mocks__/Services/MockSendResetEmailService';
import MockUserRepository from '../__mocks__/Repositories/MockUserRepository';

let forgotPasswordService: ForgotPasswordService;

beforeAll(() => {
    forgotPasswordService = new ForgotPasswordServiceImpl({
        userRepository: new MockUserRepository(),
        sendResetEmailService: new MockSendResetEmailService(),
    });
});

describe('Forgot Password Service', () => {
    it('should be able to send a reset password email', () => {
        const userEmail = 'email@email.com';

        expect(forgotPasswordService.sendEmail(userEmail))
            .resolves
            .toBeUndefined();
    });

    it('should throw error when email not found', () => {
        const userEmail = '';

        expect(forgotPasswordService.sendEmail(userEmail))
            .rejects
            .toEqual(new ValidationException('Email not found'));
    });
});