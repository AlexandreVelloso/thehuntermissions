import { Router } from 'express';

import WeaponController from '../Controllers/WeaponController';
import WeaponService from '../Services/WeaponServiceImpl';
import WeaponRepositoryImpl from '../Repositories/WeaponRepositoryImpl';
import UserWeaponRepositoryImpl from '../Repositories/UserWeaponRepositoryImpl';

const router = Router();

const weaponController = new WeaponController(
    new WeaponService(
        new WeaponRepositoryImpl(),
        new UserWeaponRepositoryImpl(),
    ),
);

router.get('/weapons', (req, res) => weaponController.index(req, res));
router.get('/weapons/:id', (req, res) => weaponController.get(req, res));
router.put('/weapons/:id', (req, res) => weaponController.update(req, res));

export default router;
