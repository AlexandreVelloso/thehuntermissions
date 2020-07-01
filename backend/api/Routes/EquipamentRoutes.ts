import { Router } from 'express';
import { AwilixContainer } from 'awilix';

import EquipamentController from '../Controllers/EquipamentController';

function createEquipamentRoutes(container: AwilixContainer): Router {
    const router = Router();

    const equipamentController: EquipamentController = container.resolve('equipamentController');

    router.get('/equipaments', (req, res) => equipamentController.index(req, res));
    router.get('/equipaments/:id', (req, res) => equipamentController.get(req, res));
    router.put('/equipaments/:id', (req, res) => equipamentController.update(req, res));

    return router;
}

export default createEquipamentRoutes;
