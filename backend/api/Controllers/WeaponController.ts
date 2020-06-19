import { Response } from 'express';

import WeaponService from '../Services/WeaponService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Models/UserCredentials';

class WeaponController extends BaseController {

    private weaponService: WeaponService;

    public constructor(weaponService: WeaponService) {
        super();

        this.weaponService = weaponService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials) {
        const weapons = await this.weaponService.index(user.id);

        return this.ok(res, weapons);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials) {
        const { id } = req.params;

        const weapon = await this.weaponService.get(id, user.id);

        return this.ok(res, weapon);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials) {
        const { id } = req.params;
        const { have_weapon: haveWeapon } = req.body;

        await this.weaponService.update(id, haveWeapon, user.id);

        return this.noContent(res);
    }
}

export default WeaponController;
