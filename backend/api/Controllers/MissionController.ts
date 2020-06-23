import { Response } from 'express';

import MissionService from '../Services/MissionService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import CacheService from '../Services/CacheService';
import MissionDto from '../Dtos/MissionDto';
import BaseValidator from '../Validators/BaseValidator';

class MissionController extends BaseController {

    private missionService: MissionService;
    private cacheService: CacheService;
    private getValidator: BaseValidator;
    private updateMissionsValidator: BaseValidator;

    public constructor(opts: any) {
        super();

        this.missionService = opts.missionService;
        this.cacheService = opts.cacheService;
        this.getValidator = opts.getValidator;
        this.updateMissionsValidator = opts.updateMissionsValidator;
    }

    protected async indexImpl(res: Response, user: LoginCredentials): Promise<any> {
        const key = `indexMission_${user.id}`;

        const missions: MissionDto[] = await this.cacheService
            .get(key, async () => {
                const missions: MissionDto[] = await this.missionService
                    .index(user.id);

                return missions;
            });

        return this.ok(res, missions);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: missionId } = this.getValidator
            .validate(req);

        const key = `getMission_${missionId}_${user.id}`;

        const mission: MissionDto = await this.cacheService
            .get(key, async () => {
                const mission: MissionDto = await this.missionService
                    .get(missionId, user.id);

                return mission;
            });

        return this.ok(res, mission);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {

        const { missionId, completed } = this.updateMissionsValidator
            .validate(req);

        await this.missionService
            .update(missionId, completed, user.id);

        this.cacheService.delByUserId(user.id);

        return this.noContent(res);
    }
}

export default MissionController;
