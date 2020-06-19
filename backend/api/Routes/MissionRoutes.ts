import { Router } from 'express';

import MissionController from '../Controllers/MissionController';
import MissionServiceImpl from '../Services/impl/MissionServiceImpl';
import MissionRepositoryImpl from '../Repositories/impl/MissionRepositoryImpl';
import ObjectiveRepositoryImpl from '../Repositories/impl/ObjectiveRepositoryImpl';
import UserObjectiveRepositoryImpl from '../Repositories/impl/UserObjectiveRepositoryImpl';

const router = Router();

const missionController = new MissionController(
    new MissionServiceImpl(
        new MissionRepositoryImpl(),
        new ObjectiveRepositoryImpl(),
        new UserObjectiveRepositoryImpl()
    )
);

router.get('/missions', (req, res) => missionController.index(req, res));
router.get('/missions/:id', (req, res) => missionController.get(req, res));
router.put('/missions/:id', (req, res) => missionController.update(req, res));

export default router;
