import { Router } from 'express';

import AnimalController from '../Controllers/AnimalController';

const router = Router();

router.get('/animals', AnimalController.index);
router.get('/animals/:id', AnimalController.get);

export default router;
