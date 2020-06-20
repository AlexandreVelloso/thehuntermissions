import { Response } from 'express';

import ObjectiveService from '../Services/ObjectiveService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import ObjectiveDto from '../Dtos/ObjectiveDto';
import CacheService from '../Services/CacheService';

class ObjectiveController extends BaseController {

    private objectiveService: ObjectiveService;
    private cacheService: CacheService;

    public constructor(opts: any) {
        super();

        this.objectiveService = opts.objectiveService;
        this.cacheService = opts.cacheService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials) {
        const key = `indexObjective_${user.id}`;

        const result = await this.cacheService
            .get(key, async () => {
                const objectives: ObjectiveDto[] = await this.objectiveService
                    .index(user.id);

                return objectives;
            });

        return this.ok(res, result);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials) {
        const { id: objectiveId } = req.params;

        const key = `getObjective_${objectiveId}_${user.id}`;

        const result = await this.cacheService
            .get(key, async () => {
                const objective: ObjectiveDto = await this.objectiveService
                    .get(objectiveId, user.id);

                return objective;
            });

        return this.ok(res, result);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials) {
        const { id } = req.params;
        const { completed } = req.body;

        await this.objectiveService
            .update(id, completed, user.id);

        this.cacheService.delByUserId(user.id);

        return this.noContent(res);
    }
}

export default ObjectiveController;
