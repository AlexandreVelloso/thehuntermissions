import { Router } from 'express';
import AuthController from '../Controllers/AuthController';
import AuthServiceImpl from '../Services/AuthServiceImpl';
import UserRepositoryImpl from '../Repositories/UserRepositoryImpl';

const router = Router();

const authController = new AuthController(
    new AuthServiceImpl(
        new UserRepositoryImpl()
    )
);

router.post('/auth/login', (req, res) => authController.login(req, res));
router.post('/auth/register', (req, res) => authController.register(req, res));
router.post('/auth/resetPassword', (req, res) => authController.resetPassword(req, res));
router.post('/auth/refresh', (req, res) => authController.refreshToken(req, res));

export default router;
