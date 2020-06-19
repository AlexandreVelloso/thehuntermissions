import { Router } from 'express';

import WeaponController from '../Controllers/WeaponController';

const router = Router();

const weaponController = new WeaponController();

router.get('/weapons', (req, res) => weaponController.index(req, res));
router.get('/weapons/:id', (req, res) => weaponController.get(req, res));
router.put('/weapons/:id', (req, res) => weaponController.update(req, res));

export default router;
