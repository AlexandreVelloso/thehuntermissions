import { Request, Response } from 'express';

import ForgotPasswordService from '../Services/ForgotPasswordService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';
import ForgotPasswordValidator from '../Validators/ForgotPasswordValidator';

class ForgotPasswordController {

    private forgorPasswordService: ForgotPasswordService;
    private forgotPasswordValidator: ForgotPasswordValidator;

    public constructor(opts: any) {
        this.forgorPasswordService = opts.forgorPasswordService;
        this.forgotPasswordValidator = opts.forgotPasswordValidator;
    }

    async sendEmail(req: Request, res: Response) {
        const { email } = this.forgotPasswordValidator
            .validate(req);

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
