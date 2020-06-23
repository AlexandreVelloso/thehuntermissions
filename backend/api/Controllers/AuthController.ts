import { Request, Response } from 'express';

import AuthService from '../Services/AuthService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';
import UserCredentials from '../Dtos/UserCredentialsDto';

class AuthController {

    private authService: AuthService;

    public constructor(opts: any) {
        this.authService = opts.authService;
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const userCredentials: UserCredentials = await this.authService
                .login(email, password);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    async register(req: Request, res: Response) {
        const { username, email, password } = req.body;

        try {
            const userCredentials: UserCredentials = await this.authService
                .register(username, email, password);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    async resetPassword(req: Request, res: Response) {
        const { token, password, confirmPassword } = req.body;

        try {
            await this.authService
                .resetPassword(token, password, confirmPassword);
            return res.status(200).end();
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;

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
