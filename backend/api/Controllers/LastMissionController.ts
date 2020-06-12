import { Response } from 'express';

import LastMissionService from '../Services/LastMissionService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';

class LastMissionController {
    static async index(req: any, res: Response) {
        const { user } = req.auth;

        try {
            const animals = await LastMissionService.index(user.id);
            return res.json(animals);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async get(req: any, res: Response) {
        const { user } = req.auth;

        const { id: animalId } = req.params;

        try {
            const animal = await LastMissionService.get(animalId, user.id);
            return res.json(animal);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default LastMissionController;
