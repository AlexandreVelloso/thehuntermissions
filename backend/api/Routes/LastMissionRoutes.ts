import express from 'express';

import LastMissionController from '../Controllers/LastMissionController';
import LastMissionServiceImpl from '../Services/impl/LastMissionServiceImpl';
import AnimalServiceImpl from '../Services/impl/AnimalServiceImpl';
import AnimalRepositoryImpl from '../Repositories/impl/AnimalRepositoryImpl';

const router = express.Router();

const lastMissionController = new LastMissionController(
    new LastMissionServiceImpl(
        new AnimalServiceImpl(
            new AnimalRepositoryImpl()
        ),
    )
);

router.get('/lastMissions', (req, res) => lastMissionController.index(req, res));
router.get('/lastMissions/:id', (req, res) => lastMissionController.get(req, res));

export default router;
