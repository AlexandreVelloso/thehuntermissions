import { Router } from 'express';

import WeaponController from '../Controllers/WeaponController';

const router = Router();

router.get('/weapons', WeaponController.index);
router.get('/weapons/:id', WeaponController.get);
router.put('/weapons/:id', WeaponController.update);

export default router;
