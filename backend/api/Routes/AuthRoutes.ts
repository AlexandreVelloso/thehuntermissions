import { Router } from 'express';
import { AwilixContainer } from 'awilix';

import AuthController from '../Controllers/AuthController';

function createAuthRoutes(container: AwilixContainer): Router {
    const router = Router();

    const authController: AuthController = container.resolve('authController');

    router.post('/auth/login', (req, res) => authController.login(req, res));
    router.post('/auth/register', (req, res) => authController.register(req, res));
    router.post('/auth/resetPassword', (req, res) => authController.resetPassword(req, res));
    router.post('/auth/refresh', (req, res) => authController.refreshToken(req, res));

    return router;
}

export default createAuthRoutes;
