import { Request, Response } from 'express';

import BaseException from '../Exceptions/BaseException';

class ErrorHandlerMiddleware {
    static handle(err: any, _req: Request, response: Response): Response {
        let status: number = 500;

        if (err instanceof BaseException) {
            status = err.statusCode;
        }

        return response
            .status(status)
            .json({
                error: err.message,
            });
    }
}

export default ErrorHandlerMiddleware;
