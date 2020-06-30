import AuthService from "../../api/Services/AuthService";
import AuthServiceImpl from "../../api/Services/impl/AuthServiceImpl";
import ValidationException from "../../api/Exceptions/ValidationException";
import { sign } from "../../api/Utils/JwtToken";
import UnauthorizedOperationException from "../../api/Exceptions/UnauthorizedOperationException";

import MockUserRepository from "../__mocks__/Repositories/MockUserRepository";
import MockStartWeaponsService from '../__mocks__/Services/MockStartWeaponsService';

let authService: AuthService;

beforeAll(() => {
    authService = new AuthServiceImpl({
        userRepository: new MockUserRepository(),
        startWeaponsService: new MockStartWeaponsService()
    });
});

describe('Register', () => {
    it('should be able to register user', async () => {
        const username = 'username';
        const email = 'newEmail@email.com';
        const password = 'password';

        const result = await authService.register(username, email, password);

        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('access_token');
        expect(result).toHaveProperty('refresh_token');

        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('username');
        expect(result.user).toHaveProperty('email');
    });

    it('should throw exception when email already exists', () => {
        const username = 'username';
        const email = 'email@email.com';
        const password = 'password';

        expect(authService.register(username, email, password))
            .rejects
            .toEqual(new ValidationException('Email already exists'));
    });
});

describe('Login', () => {
    it('should be able to login user', async () => {
        const email = 'email@email.com';
        const password = 'password';

        const result = await authService.login(email, password);

        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('access_token');
        expect(result).toHaveProperty('refresh_token');

        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('username');
        expect(result.user).toHaveProperty('email');
    });

    it('should throw error when user not exists', () => {
        const email = 'newEmail@email.com';
        const password = 'password';

        expect(authService.login(email, password))
            .rejects
            .toEqual(new ValidationException('Email or password incorrect'))
    });

    it('should throw error when user not exists', () => {
        const email = 'email@email.com';
        const password = 'incorrect password';

        expect(authService.login(email, password))
            .rejects
            .toEqual(new ValidationException('Email or password incorrect'))
    });
});

describe('Reset password', () => {
    it('should reset a user password', () => {
        const token = sign({ email: 'email@email.com' });

        expect(authService.resetPassword(token, 'password', 'password'))
            .resolves
            .toBeUndefined();
    });

    it('should throw exception when passwords do not match', () => {
        const token = sign({ email: 'email@email.com' });

        expect(authService.resetPassword(token, 'password', 'wrong password'))
            .rejects
            .toEqual(new ValidationException('The passwords don\'t match'));
    });

    it('should throw exception when token is invalid', () => {
        const token = 'invalid token';

        expect(authService.resetPassword(token, 'password', 'wrong password'))
            .rejects
            .toEqual(new ValidationException('Invalid token'));
    });

    it('should throw exception when not find the user', () => {
        const token = sign({ email: 'invalid email' });

        expect(authService.resetPassword(token, 'password', 'password'))
            .rejects
            .toEqual(new ValidationException('User not found'));
    });
});

describe('Refresh token', () => {
    it('should reset user token', async () => {
        const refreshToken = 'valid token';

        const result = await authService.refreshToken(refreshToken);

        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('access_token');
        expect(result).toHaveProperty('refresh_token');

        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('username');
        expect(result.user).toHaveProperty('email');
    });

    it('should fail when not found the refresh token', () => {
        const refreshToken = '';

        expect(authService.refreshToken(refreshToken))
            .rejects
            .toEqual(new UnauthorizedOperationException('Invalid refresh token'));
    });
});