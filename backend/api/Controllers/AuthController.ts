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
        try {
            const { email, password } = this.authLoginValidator
                .validate(req);

            const userCredentials: UserCredentials = await this.authService
                .login(email, password);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { username, email, password } = this.authRegisterValidator
                .validate(req);

            const userCredentials: UserCredentials = await this.authService
                .register(username, email, password);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { token, password, confirm_password: confirmPassword } = this.authResetPasswordValidator
                .validate(req);

            await this.authService
                .resetPassword(token, password, confirmPassword);
            return res.status(200).end();
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const { refresh_token: refreshToken } = this.authRefreshTokenValidator
                .validate(req);

            const userCredentials: UserCredentials = await this.authService
                .refreshToken(refreshToken);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default AuthController;
