import { Response } from 'express';

import AnimalService from '../Services/AnimalService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';

class AnimalController {
    static async index(req: any, res: Response) {
        const { user } = req.auth;

        try {
            const animals = await AnimalService.index(user.id);
            return res.json(animals);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async get(req: any, res: Response) {
        const { user } = req.auth;

        const animalId = String(req.params.id);

        try {
            const animal = await AnimalService.get(animalId, user.id);
            return res.json(animal);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default AnimalController;
