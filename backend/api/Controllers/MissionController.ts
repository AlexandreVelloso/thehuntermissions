import { Response } from 'express';

import MissionService from '../Services/MissionService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';

class MissionController {
    static async index(req: any, res: Response) {
        const { user } = req.auth;

        try {
            const missions = await MissionService.index(user.id);
            return res.json(missions);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async get(req: any, res: Response) {
        const { user } = req.auth;
        const { id: missionId } = req.params;

        try {
            const mission = await MissionService.get(missionId, user.id);
            return res.json(mission);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async update(req: any, res: Response) {
        const { user } = req.auth;
        const { id: missionId } = req.params;
        const { completed } = req.body;

        try {
            await MissionService.update(missionId, completed, user.id);
            return res.status(204).end();
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default MissionController;
