import { Router } from 'express';

import ObjectiveController from '../Controllers/ObjectiveController';

const router = Router();

router.get('/objectives', ObjectiveController.index);
router.get('/objectives/:id', ObjectiveController.get);
router.put('/objectives/:id', ObjectiveController.update);

export default router;
