import { Response } from 'express';

import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';

abstract class BaseController {
    public async index(req: any, res: Response) {
        const user = req.auth.user;

        try {
            await this.indexImpl(req, res, user);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    public async get(req: any, res: Response) {
        const user = req.auth.user;

        try {
            await this.getImpl(req, res, user);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    public async update(req: any, res: Response) {
        const user = req.auth.user;

        try {
            await this.updateImpl(req, res, user);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    protected abstract async indexImpl(req: any, res: Response, user: LoginCredentials): Promise<void | any>;
    protected abstract async getImpl(req: any, res: Response, user: LoginCredentials): Promise<void | any>;
    protected abstract async updateImpl(req: any, res: Response, user: LoginCredentials): Promise<void | any>;

    public static jsonResponse(res: Response, code: number, json: any) {
        return res.status(code).json(json)
    }

    public ok(res: Response, dto?: any) {
        if (!!dto) {
            return BaseController.jsonResponse(res, 200, dto);
        }

        return res.end();
    }

    public noContent(res: Response) {
        return res.status(204).end();
    }

    public unauthorized(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 401, 'Unauthorized');
    }
}

export default BaseController;