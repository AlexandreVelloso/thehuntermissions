import { Router } from 'express';
import { AwilixContainer } from 'awilix';

import MissionController from '../Controllers/MissionController';

function createMissionRoutes(container: AwilixContainer): Router {
    const router = Router();

    const missionController: MissionController = container.resolve('missionController');

    router.get('/missions', (req, res) => missionController.index(req, res));
    router.get('/missions/:id', (req, res) => missionController.get(req, res));
    router.put('/missions/:id', (req, res) => missionController.update(req, res));

    return router;
}

export default createMissionRoutes;

