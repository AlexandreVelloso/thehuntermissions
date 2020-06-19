import { Response } from 'express';

import ObjectiveService from '../Services/ObjectiveService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Models/UserCredentials';
import ObjectiveDto from '../Dtos/ObjectiveDto';

class ObjectiveController extends BaseController {

    private objectiveService: ObjectiveService;

    public constructor(objectiveService: ObjectiveService) {
        super();

        this.objectiveService = objectiveService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials) {
        const objectives: ObjectiveDto[] = await this.objectiveService
            .index(user.id);

        return this.ok(res, objectives);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials) {
        const { id: objectiveId } = req.params;

        const objective: ObjectiveDto = await this.objectiveService
            .get(objectiveId, user.id);

        return this.ok(res, objective);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials) {
        const { id } = req.params;
        const { completed } = req.body;

        await this.objectiveService
            .update(id, completed, user.id);

        return this.noContent(res);
    }
}

export default ObjectiveController;
