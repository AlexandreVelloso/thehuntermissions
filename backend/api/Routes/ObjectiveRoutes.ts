import { Router } from 'express';
import { AwilixContainer } from 'awilix';

import ObjectiveController from '../Controllers/ObjectiveController';

function createObjectiveRoutes(container: AwilixContainer): Router {
    const router = Router();

    const objectiveController: ObjectiveController = container.resolve('objectiveController');

    router.get('/objectives', (req, res) => objectiveController.index(req, res));
    router.get('/objectives/:id', (req, res) => objectiveController.get(req, res));
    router.put('/objectives/:id', (req, res) => objectiveController.update(req, res));

    return router;
}

export default createObjectiveRoutes;
