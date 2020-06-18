import { Response } from 'express';

import WeaponService from '../Services/WeaponService';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';

class WeaponController {
    static async index(req: any, res: Response) {
        const { user } = req.auth;

        try {
            const weapons = await WeaponService.index(user.id);
            return res.json(weapons);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async get(req: any, res: Response) {
        const { user } = req.auth;

        const { id } = req.params;

        try {
            const weapon = await WeaponService.get(id, user.id);
            return res.json(weapon);
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }

    static async update(req: any, res: Response) {
        const { user } = req.auth;

        const { id } = req.params;
        const { have_weapon: haveWeapon } = req.body;

        try {
            await WeaponService.update(id, haveWeapon, user.id);
            return res.status(204).end();
        } catch (err) {
            return ErrorHandlerMiddleware.handle(err, req, res);
        }
    }
}

export default WeaponController;
