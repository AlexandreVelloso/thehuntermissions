import { Router } from 'express';
import { AwilixContainer } from 'awilix';

import LastMissionController from '../Controllers/LastMissionController';

function createLastMissionRoutes(container: AwilixContainer): Router {
    const router = Router();

    const lastMissionController: LastMissionController = container.resolve('lastMissionController');

    router.get('/lastMissions', (req, res) => lastMissionController.index(req, res));
    router.get('/lastMissions/:id', (req, res) => lastMissionController.get(req, res));

    return router;
}

export default createLastMissionRoutes;
