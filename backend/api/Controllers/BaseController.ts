import { Response } from 'express';

import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';
import { LoginCredentials } from '../Models/UserCredentials';

abstract class BaseController {
    protected req: any;
    protected res!: Response;
    private user?: LoginCredentials;

    public async index(req: any, res: Response) {
        this.req = req;
        this.res = res;
        this.user = req.auth.user;

        try {
            await this.indexImpl(this.user);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, this.req, this.res);
        }
    }

    public async get(req: any, res: Response) {
        this.req = req;
        this.res = res;
        this.user = req.auth.user;

        try {
            await this.getImpl(this.user);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, this.req, this.res);
        }
    }

    public async update(req: any, res: Response) {
        this.req = req;
        this.res = res;
        this.user = req.auth.user;

        try {
            await this.updateImpl(this.user);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, this.req, this.res);
        }
    }

    protected abstract async indexImpl(user: any): Promise<void | any>;
    protected abstract async getImpl(user: any): Promise<void | any>;
    protected abstract async updateImpl(user: any): Promise<void | any>;

    public static jsonResponse(res: Response, code: number, json: any) {
        return res.status(code).json(json)
    }

    public ok(dto?: any) {
        if (!!dto) {
            return BaseController.jsonResponse(this.res, 200, dto);
        }

        return this.res.end();
    }

    public noContent() {
        return this.res.status(204).end();
    }

    public unauthorized(message?: string) {
        return BaseController.jsonResponse(this.res, 401, 'Unauthorized');
    }
}

export default BaseController;