import { Response } from 'express';

import WeaponService from '../Services/WeaponService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import WeaponDto from '../Dtos/WeaponDto';
import CacheService from '../Services/CacheService';

class WeaponController extends BaseController {

    private weaponService: WeaponService;
    private cacheService: CacheService;

    public constructor(opts: any) {
        super();

        this.weaponService = opts.weaponService;
        this.cacheService = opts.cacheService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials) {
        const key = `indexWeapon_${user.id}`;

        const result = await this.cacheService
            .get(key, async () => {
                const weapons: WeaponDto[] = await this.weaponService
                    .index(user.id);

                return weapons;
            });

        return this.ok(res, result);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials) {
        const { id: weaponId } = req.params;

        const key = `getWeapon_${weaponId}_${user.id}`;

        const result = await this.cacheService
            .get(key, async () => {
                const weapon: WeaponDto = await this.weaponService
                    .get(weaponId, user.id);

                return weapon;
            });

        return this.ok(res, result);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials) {
        const { id: weaponId } = req.params;
        const { have_weapon: haveWeapon } = req.body;

        await this.weaponService
            .update(weaponId, haveWeapon, user.id);

        this.cacheService.delByUserId(user.id);

        return this.noContent(res);
    }
}

export default WeaponController;
