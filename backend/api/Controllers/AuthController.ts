import { Request, Response } from 'express';

import AuthService from '../Services/AuthService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';
import UserCredentials from '../Dtos/UserCredentialsDto';
import BaseValidator from '../Validators/BaseValidator';

class AuthController {

    private authService: AuthService;
    private authLoginValidator: BaseValidator;
    private authRegisterValidator: BaseValidator;
    private authResetPasswordValidator: BaseValidator;
    private authRefreshTokenValidator: BaseValidator;

    public constructor(opts: any) {
        this.authService = opts.authService;
        this.authLoginValidator = opts.authLoginValidator;
        this.authRegisterValidator = opts.authRegisterValidator;
        this.authResetPasswordValidator = opts.authResetPasswordValidator;
        this.authRefreshTokenValidator = opts.authRefreshTokenValidator;
    }

    async login(req: Request, res: Response) {
        const { email, password } = this.authLoginValidator
            .validate(req);

        try {
            const userCredentials: UserCredentials = await this.authService
                .login(email, password);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    async register(req: Request, res: Response) {
        const { username, email, password } = this.authRegisterValidator
            .validate(req);

        try {
            const userCredentials: UserCredentials = await this.authService
                .register(username, email, password);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    async resetPassword(req: Request, res: Response) {
        const { token, password, confirm_password: confirmPassword } = this.authResetPasswordValidator
            .validate(req);

        try {
            await this.authService
                .resetPassword(token, password, confirmPassword);
            return res.status(200).end();
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = this.authRefreshTokenValidator
            .validate(req);

        try {
            const userCredentials: UserCredentials = await this.authService
                .refreshToken(refreshToken);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default AuthController;
