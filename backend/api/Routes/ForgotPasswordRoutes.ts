import { Router } from 'express';

import ForgotPasswordController from '../Controllers/ForgotPasswordController';
import ForgotPasswordServiceImpl from '../Services/impl/ForgotPasswordServiceImpl';
import SendRequestEmailServiceImpl from '../Services/impl/SendResetEmailServiceImpl';
import UserRepositoryImpl from '../Repositories/impl/UserRepositoryImpl';

const router = Router();

const forgotPasswordController = new ForgotPasswordController(
    new ForgotPasswordServiceImpl(
        new UserRepositoryImpl(),
        new SendRequestEmailServiceImpl(),
    )
);

router.post('/forgotPassword', (req, res) => forgotPasswordController.sendEmail(req, res));

export default router;
