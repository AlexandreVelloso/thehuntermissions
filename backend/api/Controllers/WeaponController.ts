import { Response } from 'express';

import WeaponService from '../Services/WeaponService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import WeaponDto from '../Dtos/WeaponDto';
import CacheService from '../Services/CacheService';
import BaseValidator from '../Validators/BaseValidator';

class WeaponController extends BaseController {

    private weaponService: WeaponService;
    private cacheService: CacheService;
    private getValidator: BaseValidator;
    private updateWeaponValidator: BaseValidator;

    public constructor(opts: any) {
        super();

        this.weaponService = opts.weaponService;
        this.cacheService = opts.cacheService;
        this.getValidator = opts.getValidator;
        this.updateWeaponValidator = opts.updateWeaponValidator;
    }

    protected async indexImpl(res: Response, user: LoginCredentials) {
        const key = `indexWeapon_${user.id}`;

        const weapons: WeaponDto[] = await this.cacheService
            .get(key, async () => {
                const weapons: WeaponDto[] = await this.weaponService
                    .index(user.id);

                return weapons;
            });

        return this.ok(res, weapons);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials) {
        const { id: weaponId } = this.getValidator
            .validate(req);

        const key = `getWeapon_${weaponId}_${user.id}`;

        const weapon: WeaponDto = await this.cacheService
            .get(key, async () => {
                const weapon: WeaponDto = await this.weaponService
                    .get(weaponId, user.id);

                return weapon;
            });

        return this.ok(res, weapon);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials) {
        const { weaponId, haveWeapon } = this.updateWeaponValidator
            .validate(req);

        await this.weaponService
            .update(weaponId, haveWeapon, user.id);

        this.cacheService.delByUserId(user.id);

        return this.noContent(res);
    }
}

export default WeaponController;
