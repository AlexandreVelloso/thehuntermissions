import { Router } from 'express';

import ObjectiveController from '../Controllers/ObjectiveController';
import ObjectiveServiceImpl from '../Services/impl/ObjectiveServiceImpl';
import UserObjectiveRepositoryImpl from '../Repositories/impl/UserObjectiveRepositoryImpl';
import ObjectiveRepositoryImpl from '../Repositories/impl/ObjectiveRepositoryImpl';

const router = Router();

const objectiveController = new ObjectiveController(
    new ObjectiveServiceImpl(
        new ObjectiveRepositoryImpl(),
        new UserObjectiveRepositoryImpl(),
    ),
);

router.get('/objectives', (req, res) => objectiveController.index(req, res));
router.get('/objectives/:id', (req, res) => objectiveController.get(req, res));
router.put('/objectives/:id', (req, res) => objectiveController.update(req, res));

export default router;
