import express from 'express';

import LastMissionController from '../Controllers/LastMissionController';
import LastMissionServiceImpl from '../Services/LastMissionServiceImpl';
import AnimalServiceImpl from '../Services/AnimalServiceImpl';
import AnimalRepositoryImpl from '../Repositories/AnimalRepositoryImpl';

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
