import { Request, Response } from 'express';

import AuthService from '../Services/AuthService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';

class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const userCredentials = await AuthService.login(email, password);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async register(req: Request, res: Response) {
        const { username, email, password } = req.body;

        try {
            const userCredentials = await AuthService.register(username, email, password);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async resetPassword(req: Request, res: Response) {
        const { token, password, confirmPassword } = req.body;

        try {
            await AuthService.resetPassword(token, password, confirmPassword);
            return res.status(200).end();
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;

        try {
            const userCredentials = await AuthService.refreshToken(refreshToken);
            return res.json(userCredentials);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default AuthController;
