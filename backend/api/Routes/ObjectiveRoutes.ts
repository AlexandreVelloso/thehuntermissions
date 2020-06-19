import { Router } from 'express';

import ObjectiveController from '../Controllers/ObjectiveController';

const router = Router();

const objectiveController = new ObjectiveController();

router.get('/objectives', (req, res) => objectiveController.index(req, res));
router.get('/objectives/:id', (req, res) => objectiveController.get(req, res));
router.put('/objectives/:id', (req, res) => objectiveController.update(req, res));

export default router;
