import { Response } from 'express';

import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';

abstract class BaseController {
    protected req: any;
    protected res!: Response;
    private user?: any;

    public async index(req: any, res: Response) {
        this.req = req;
        this.res = res;
        this.user = req.auth.user;

        try {
            this.indexImpl(this.user);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, this.req, this.res);
        }
    }

    public async get(req: any, res: Response) {
        this.req = req;
        this.res = res;
        this.user = req.auth.user;

        try {
            this.getImpl(this.user);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, this.req, this.res);
        }
    }

    public async update(req: any, res: Response) {
        this.req = req;
        this.res = res;
        this.user = req.auth.user;

        try {
            this.updateImpl(this.user);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, this.req, this.res);
        }
    }

    protected abstract async indexImpl(user: any): Promise<void | any>;
    protected abstract async getImpl(user: any): Promise<void | any>;
    protected abstract async updateImpl(user: any): Promise<void | any>;

    public static jsonResponse(res: Response, code: number, message: any) {
        return res.status(code).json({ message })
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