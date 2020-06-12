import { Router } from 'express';
import AuthController from '../Controllers/AuthController';

const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.post('/auth/resetPassword', AuthController.resetPassword);
router.post('/auth/refresh', AuthController.refreshToken);

export default router;
