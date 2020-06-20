import { Response } from 'express';

import LastMissionService from '../Services/LastMissionService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import LastMissionDto from '../Dtos/LastMissionDto';

class LastMissionController extends BaseController {

    private lastMissionService: LastMissionService;

    public constructor(opts: any) {
        super();

        this.lastMissionService = opts.lastMissionService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials): Promise<any> {
        const animals: LastMissionDto[] = await this.lastMissionService
            .index(user.id);

        return this.ok(res, animals);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: animalId } = req.params;

        const animal: LastMissionDto = await this.lastMissionService
            .get(animalId, user.id);

        return this.ok(res, animal);
    }

    protected updateImpl(_req: any, _res: Response, _user: LoginCredentials): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default LastMissionController;
