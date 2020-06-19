import WeaponService from '../Services/WeaponService';
import BaseController from './BaseController';

class WeaponController extends BaseController {

    public constructor() {
        super();
    }

    protected async indexImpl(user: any): Promise<any> {
        const weapons = await WeaponService.index(user.id);

        return this.ok(weapons);
    }

    protected async getImpl(user: any): Promise<any> {
        const { id } = this.req.params;

        const weapon = await WeaponService.get(id, user.id);

        return this.ok(weapon);
    }

    protected async updateImpl(user: any): Promise<any> {
        const { id } = this.req.params;
        const { have_weapon: haveWeapon } = this.req.body;

        await WeaponService.update(id, haveWeapon, user.id);
        
        return this.noContent();
    }
}

export default WeaponController;
