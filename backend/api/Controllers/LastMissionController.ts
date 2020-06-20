import { Response } from 'express';

import LastMissionService from '../Services/LastMissionService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import LastMissionDto from '../Dtos/LastMissionDto';
import CacheService from '../Services/CacheService';

class LastMissionController extends BaseController {

    private lastMissionService: LastMissionService;
    private cacheService: CacheService;

    public constructor(opts: any) {
        super();

        this.lastMissionService = opts.lastMissionService;
        this.cacheService = opts.cacheService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials): Promise<any> {
        const key = `indexLastMission_${user.id}`;

        const result = await this.cacheService
            .get(key, async () => {
                const animals: LastMissionDto[] = await this.lastMissionService
                    .index(user.id);

                return animals;
            });

        return this.ok(res, result);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: animalId } = req.params;

        const key = `getLastMission_${animalId}_${user.id}`;

        const result = await this.cacheService
            .get(key, async () => {
                const animal: LastMissionDto = await this.lastMissionService
                    .get(animalId, user.id);

                return animal;
            });

        return this.ok(res, result);
    }

    protected updateImpl(_req: any, _res: Response, _user: LoginCredentials): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default LastMissionController;
