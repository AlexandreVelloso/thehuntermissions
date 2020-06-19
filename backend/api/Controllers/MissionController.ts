import { Response } from 'express';

import MissionService from '../Services/MissionService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Models/UserCredentials';

class MissionController extends BaseController {

    private missionService: MissionService;

    public constructor(missionService: MissionService) {
        super();

        this.missionService = missionService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials): Promise<any> {
        const missions = await this.missionService
            .index(user.id);

        return this.ok(res, missions);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: missionId } = req.params;

        const mission = await this.missionService
            .get(missionId, user.id);

        return this.ok(res, mission);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: missionId } = req.params;
        const { completed } = req.body;

        await this.missionService
            .update(missionId, completed, user.id);

        return this.noContent(res);
    }
}

export default MissionController;
