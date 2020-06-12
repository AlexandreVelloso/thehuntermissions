import { Request, Response } from 'express';

import ForgotPasswordService from '../Services/ForgotPasswordService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';

class ForgotPasswordController {
    static async sendEmail(req: Request, res: Response) {
        const { email = '' } = req.body;

        try {
            await ForgotPasswordService.sendEmail(email);
            return res.status(200).end();
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default ForgotPasswordController;
