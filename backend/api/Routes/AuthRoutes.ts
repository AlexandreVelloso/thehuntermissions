import { Router } from 'express';
import AuthController from '../Controllers/AuthController';
import AuthServiceImpl from '../Services/impl/AuthServiceImpl';
import UserRepositoryImpl from '../Repositories/impl/UserRepositoryImpl';
import StartWeaponsServiceImpl from '../Services/impl/StartWeaponsServiceImpl';
import WeaponRepositoryImpl from '../Repositories/impl/WeaponRepositoryImpl';
import UserWeaponRepositoryImpl from '../Repositories/impl/UserWeaponRepositoryImpl';

const router = Router();

const authController = new AuthController(
    new AuthServiceImpl(
        new UserRepositoryImpl(),
        new StartWeaponsServiceImpl(
            new WeaponRepositoryImpl(),
            new UserWeaponRepositoryImpl()
        ),
    )
);

router.post('/auth/login', (req, res) => authController.login(req, res));
router.post('/auth/register', (req, res) => authController.register(req, res));
router.post('/auth/resetPassword', (req, res) => authController.resetPassword(req, res));
router.post('/auth/refresh', (req, res) => authController.refreshToken(req, res));

export default router;
