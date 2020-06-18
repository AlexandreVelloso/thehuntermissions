import { Router } from 'express';

import ForgotPasswordController from '../Controllers/ForgotPasswordController';

const router = Router();

router.post('/forgotPassword', ForgotPasswordController.sendEmail);

export default router;
