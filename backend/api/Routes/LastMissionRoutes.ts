import express from 'express';

import LastMissionController from '../Controllers/LastMissionController';

const router = express.Router();

const lastMissionController = new LastMissionController();

router.get('/lastMissions', (req, res) => lastMissionController.index(req, res));
router.get('/lastMissions/:id', (req, res) => lastMissionController.get(req, res));

export default router;
