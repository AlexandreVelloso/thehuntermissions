import { Response } from 'express';

import BaseController from "./BaseController";
import EquipamentService from "../Services/EquipamentService";
import CacheService from "../Services/CacheService";
import BaseValidator from "../Validators/BaseValidator";
import EquipamentDto from "../Dtos/EquipamentDto";
import { LoginCredentials } from "../Dtos/UserCredentialsDto";

class EquipamentController extends BaseController {

    private equipamentService: EquipamentService;
    private cacheService: CacheService;
    private getValidator: BaseValidator;
    private updateEquipamentValidator: BaseValidator;

    public constructor(opts: any) {
        super();

        this.equipamentService = opts.equipamentService;
        this.cacheService = opts.cacheService;
        this.getValidator = opts.getValidator;
        this.updateEquipamentValidator = opts.updateEquipamentValidator;
    }

    private async indexEquipamentByUserId(userId: number): Promise<EquipamentDto[]> {
        const equipaments: EquipamentDto[] = await this.equipamentService
            .index(userId);

        return equipaments;
    }

    protected async indexImpl(res: Response, user: LoginCredentials) {
        const key = `indexEquipament_${user.id}`;

        let equipaments: EquipamentDto[];

        if (process.env.NODE_ENV === 'test') {
            equipaments = await this.indexEquipamentByUserId(user.id);
        } else {
            equipaments = await this.cacheService
                .get(key, async () => await this.indexEquipamentByUserId(user.id));
        }

        return this.ok(res, equipaments);
    }

    private async findEquipamentByUserId(equipamentId: number, userId: number) {
        const equipament: EquipamentDto = await this.equipamentService
            .get(equipamentId, userId);

        return equipament;
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials) {
        const { id: equipamentId } = this.getValidator
            .validate(req);

        const key = `getEquipament_${equipamentId}_${user.id}`;

        let equipament: EquipamentDto;

        if (process.env.NODE_ENV === 'test') {
            equipament = await this.findEquipamentByUserId(equipamentId, user.id);
        } else {
            equipament = await this.cacheService
                .get(key, async () => await this.findEquipamentByUserId(equipamentId, user.id));
        }

        return this.ok(res, equipament);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials) {
        const { equipamentId, haveEquipament } = this.updateEquipamentValidator
            .validate(req);

        await this.equipamentService
            .update(equipamentId, haveEquipament, user.id);

        this.cacheService.delByUserId(user.id);

        return this.noContent(res);
    }

}

export default EquipamentController;