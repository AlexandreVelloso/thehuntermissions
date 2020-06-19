import { Response } from 'express';

import LastMissionService from '../Services/LastMissionService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Models/UserCredentials';

class LastMissionController extends BaseController {

    private lastMissionService: LastMissionService;

    public constructor(lastMissionService: LastMissionService) {
        super();

        this.lastMissionService = lastMissionService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials): Promise<any> {
        const animals = await this.lastMissionService
            .index(user.id);

        return this.ok(res, animals);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: animalId } = req.params;

        const animal = await this.lastMissionService
            .get(animalId, user.id);

        return this.ok(res, animal);
    }

    protected updateImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default LastMissionController;
