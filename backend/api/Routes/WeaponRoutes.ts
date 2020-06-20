import { Router } from 'express';
import { AwilixContainer } from 'awilix';

import WeaponController from '../Controllers/WeaponController';

function createWeaponRoutes(container: AwilixContainer): Router {
    const router = Router();

    const weaponController: WeaponController = container.resolve('weaponController');

    router.get('/weapons', (req, res) => weaponController.index(req, res));
    router.get('/weapons/:id', (req, res) => weaponController.get(req, res));
    router.put('/weapons/:id', (req, res) => weaponController.update(req, res));

    return router;
}

export default createWeaponRoutes;
