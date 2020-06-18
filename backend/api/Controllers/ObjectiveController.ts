import { Response } from 'express';

import ObjectiveService from '../Services/ObjectiveService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';

class ObjectiveController {
    static async index(req: any, res: Response) {
        const { user } = req.auth;

        try {
            const objectives = await ObjectiveService.index(user.id);
            return res.json(objectives);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async get(req: any, res: Response) {
        const { user } = req.auth;
        const { id: objectiveId } = req.params;

        try {
            const objective = await ObjectiveService.get(objectiveId, user.id);
            return res.json(objective);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async update(req: any, res: Response) {
        const { user } = req.auth;
        const { id } = req.params;
        const { completed } = req.body;

        try {
            await ObjectiveService.update(id, completed, user.id);
            return res.status(204).end();
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default ObjectiveController;
