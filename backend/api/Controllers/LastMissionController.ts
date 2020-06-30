import { Response } from 'express';

import LastMissionService from '../Services/LastMissionService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import LastMissionDto from '../Dtos/LastMissionDto';
import CacheService from '../Services/CacheService';
import BaseValidator from '../Validators/BaseValidator';

class LastMissionController extends BaseController {

    private lastMissionService: LastMissionService;
    private cacheService: CacheService;
    private getValidator: BaseValidator;

    public constructor(opts: any) {
        super();

        this.lastMissionService = opts.lastMissionService;
        this.cacheService = opts.cacheService;
        this.getValidator = opts.getValidator;
    }

    private async indexLastMissionsByUserId(userId: number): Promise<LastMissionDto[]> {
        const animals: LastMissionDto[] = await this.lastMissionService
            .index(userId);

        return animals;
    }

    protected async indexImpl(res: Response, user: LoginCredentials): Promise<any> {
        const key = `indexLastMission_${user.id}`;

        let lastMissions: LastMissionDto[];

        if (process.env.NODE_ENV === 'test') {
            lastMissions = await this.indexLastMissionsByUserId(user.id);
        } else {
            lastMissions = await this.cacheService
                .get(key, this.indexLastMissionsByUserId(user.id));
        }

        return this.ok(res, lastMissions);
    }

    private async findLastMissionByUserId(animalId: number, userId: number): Promise<LastMissionDto> {
        const animal: LastMissionDto = await this.lastMissionService
            .get(animalId, userId);

        return animal;
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: animalId } = this.getValidator
            .validate(req);

        const key = `getLastMission_${animalId}_${user.id}`;

        let lastMission: LastMissionDto;

        if (process.env.NODE_ENV === 'test') {
            lastMission = await this.findLastMissionByUserId(animalId, user.id);
        } else {
            lastMission = await this.cacheService
                .get(key, async () => await this.findLastMissionByUserId(animalId, user.id));
        }

        return this.ok(res, lastMission);
    }

    protected updateImpl(_req: any, _res: Response, _user: LoginCredentials): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default LastMissionController;
