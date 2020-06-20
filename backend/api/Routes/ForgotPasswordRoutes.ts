import { Router } from 'express';
import { AwilixContainer } from 'awilix';

import ForgotPasswordController from '../Controllers/ForgotPasswordController';

function createForgotPasswordRoutes(container: AwilixContainer): Router {
    const router = Router();

    const forgotPasswordController: ForgotPasswordController = container.resolve('forgotPasswordController');

    router.post('/forgotPassword', (req, res) => forgotPasswordController.sendEmail(req, res));

    return router;
}

export default createForgotPasswordRoutes;
