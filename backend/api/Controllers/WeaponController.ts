import WeaponService from '../Services/WeaponService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Models/UserCredentials';

class WeaponController extends BaseController {

    private weaponService: WeaponService;

    public constructor(weaponService: WeaponService) {
        super();

        this.weaponService = weaponService;
    }

    protected async indexImpl(user: LoginCredentials) {
        const weapons = await this.weaponService.index(user.id);

        return this.ok(weapons);
    }

    protected async getImpl(user: LoginCredentials) {
        const { id } = this.req.params;

        const weapon = await this.weaponService.get(id, user.id);

        return this.ok(weapon);
    }

    protected async updateImpl(user: LoginCredentials) {
        const { id } = this.req.params;
        const { have_weapon: haveWeapon } = this.req.body;

        await this.weaponService.update(id, haveWeapon, user.id);

        return this.noContent();
    }
}

export default WeaponController;
