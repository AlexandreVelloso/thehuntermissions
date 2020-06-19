import { Router } from 'express';

import MissionController from '../Controllers/MissionController';

const router = Router();

const missionController = new MissionController();

router.get('/missions', (req, res) => missionController.index(req, res));
router.get('/missions/:id', (req, res) => missionController.get(req, res));
router.put('/missions/:id', (req, res) => missionController.update(req, res));

export default router;
