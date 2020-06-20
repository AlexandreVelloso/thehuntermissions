import { Request, Response } from 'express';

import ForgotPasswordService from '../Services/ForgotPasswordService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';

class ForgotPasswordController {

    private forgorPasswordService: ForgotPasswordService;

    public constructor(opts: any) {
        this.forgorPasswordService = opts.forgorPasswordService;
    }

    async sendEmail(req: Request, res: Response) {
        const { email = '' } = req.body;

        try {
            await this.forgorPasswordService
                .sendEmail(email);
            return res.status(200).end();
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default ForgotPasswordController;
