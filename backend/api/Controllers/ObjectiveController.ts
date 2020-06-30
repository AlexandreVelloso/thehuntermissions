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

    private async indexObjectivesByUserId(userId: number): Promise<ObjectiveDto[]> {
        const objectives: ObjectiveDto[] = await this.objectiveService
            .index(userId);

        return objectives;
    }

    protected async indexImpl(res: Response, user: LoginCredentials) {
        const key = `indexObjective_${user.id}`;

        let objectives: ObjectiveDto[];

        if (process.env.NODE_ENV === 'test') {
            objectives = await this.indexObjectivesByUserId(user.id);
        } else {
            objectives = await this.cacheService
                .get(key, async () => await this.indexObjectivesByUserId(user.id));
        }

        return this.ok(res, objectives);
    }

    private async findObjectiveByUserId(objectiveId: number, userId: number): Promise<ObjectiveDto> {
        const objective: ObjectiveDto = await this.objectiveService
            .get(objectiveId, userId);

        return objective;
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials) {
        const { id: objectiveId } = this.getValidator
            .validate(req);

        const key = `getObjective_${objectiveId}_${user.id}`;

        let objective: ObjectiveDto;

        if (process.env.NODE_ENV === 'test') {
            objective = await this.findObjectiveByUserId(objectiveId, user.id);
        } else {
            objective = await this.cacheService
                .get(key, async () => await this.findObjectiveByUserId(objectiveId, user.id));
        }

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
