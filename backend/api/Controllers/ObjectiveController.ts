import { Response } from 'express';

import ObjectiveService from '../Services/ObjectiveService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import ObjectiveDto from '../Dtos/ObjectiveDto';
import CacheService from '../Services/CacheService';
import BaseValidator from '../Validators/BaseValidator';

class ObjectiveController extends BaseController {

    private objectiveService: ObjectiveService;
    private cacheService: CacheService;
    private getValidator: BaseValidator;
    private updateObjectiveValidator: BaseValidator;

    public constructor(opts: any) {
        super();

        this.objectiveService = opts.objectiveService;
        this.cacheService = opts.cacheService;
        this.getValidator = opts.getValidator;
        this.updateObjectiveValidator = opts.updateObjectiveValidator;
    }

    protected async indexImpl(res: Response, user: LoginCredentials) {
        const key = `indexObjective_${user.id}`;

        const objectives: ObjectiveDto[] = await this.cacheService
            .get(key, async () => {
                const objectives: ObjectiveDto[] = await this.objectiveService
                    .index(user.id);

                return objectives;
            });

        return this.ok(res, objectives);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials) {
        const { id: objectiveId } = this.getValidator
            .validate(req);

        const key = `getObjective_${objectiveId}_${user.id}`;

        const objective: ObjectiveDto = await this.cacheService
            .get(key, async () => {
                const objective: ObjectiveDto = await this.objectiveService
                    .get(objectiveId, user.id);

                return objective;
            });

        return this.ok(res, objective);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials) {
        const { objectiveId, completed } = this.updateObjectiveValidator
            .validate(req);

        await this.objectiveService
            .update(objectiveId, completed, user.id);

        this.cacheService.delByUserId(user.id);

        return this.noContent(res);
    }
}

export default ObjectiveController;
