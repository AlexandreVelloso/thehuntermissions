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

    private async indexMissionsByUserId(userId: number): Promise<MissionDto[]> {
        const missions: MissionDto[] = await this.missionService
            .index(userId);

        return missions;
    }

    protected async indexImpl(res: Response, user: LoginCredentials): Promise<any> {
        const key = `indexMission_${user.id}`;

        let missions: MissionDto[];

        if (process.env.NODE_ENV === 'test') {
            missions = await this.indexMissionsByUserId(user.id);
        } else {
            missions = await this.cacheService
                .get(key, async () => await this.indexMissionsByUserId(user.id));
        }

        return this.ok(res, missions);
    }

    private async findMissionByUserId(missionId: number, userId: number): Promise<MissionDto> {
        const mission: MissionDto = await this.missionService
            .get(missionId, userId);

        return mission;
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: missionId } = this.getValidator
            .validate(req);

        const key = `getMission_${missionId}_${user.id}`;

        let mission: MissionDto;

        if (process.env.NODE_ENV === 'test') {
            mission = await this.findMissionByUserId(missionId, user.id);
        } else {
            mission = await this.cacheService
                .get(key, async () => await this.findMissionByUserId(missionId, user.id));
        }

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
