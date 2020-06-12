import { Router } from 'express';

import MissionController from '../Controllers/MissionController';

const router = Router();

router.get('/missions', MissionController.index);
router.get('/missions/:id', MissionController.get);
router.put('/missions/:id', MissionController.update);

export default router;
