import { Router } from 'express';

import ForgotPasswordController from '../Controllers/ForgotPasswordController';
import ForgotPasswordServiceImpl from '../Services/ForgotPasswordServiceImpl';
import UserRepositoryImpl from '../Repositories/UserRepositoryImpl';

const router = Router();

const forgotPasswordController = new ForgotPasswordController(
    new ForgotPasswordServiceImpl(
        new UserRepositoryImpl()
    )
);

router.post('/forgotPassword', (req, res) => forgotPasswordController.sendEmail(req, res));

export default router;
