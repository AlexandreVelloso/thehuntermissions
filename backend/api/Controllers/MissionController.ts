import { Response } from 'express';

import MissionService from '../Services/MissionService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Models/UserCredentials';

class MissionController extends BaseController {

    protected async indexImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const missions = await MissionService.index(user.id);

        return this.ok(res, missions);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: missionId } = req.params;

        const mission = await MissionService.get(missionId, user.id);

        return this.ok(res, mission);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: missionId } = req.params;
        const { completed } = req.body;

        await MissionService.update(missionId, completed, String(user.id));

        return this.noContent(res);
    }
}

export default MissionController;
