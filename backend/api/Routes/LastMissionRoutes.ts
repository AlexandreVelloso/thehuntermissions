import express from 'express';

import AnimalMissionController from '../Controllers/LastMissionController';

const router = express.Router();

router.get('/lastMissions', AnimalMissionController.index);
router.get('/lastMissions/:id', AnimalMissionController.get);

export default router;
