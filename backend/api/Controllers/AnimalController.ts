import { Response } from 'express';

import AnimalService from '../Services/AnimalService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Models/UserCredentials';

class AnimalController extends BaseController {

    protected async indexImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const animals = await AnimalService.index(user.id);

        return this.ok(res, animals);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const animalId = req.params.id;

        const animal = await AnimalService.get(animalId, user.id);

        return this.ok(res, animal);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default AnimalController;
