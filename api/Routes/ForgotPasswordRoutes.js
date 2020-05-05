const express = require('express');

const router = express.Router();

const ForgotPasswordController = require('../Controllers/ForgotPasswordController');

router.post('/forgotPassword', ForgotPasswordController.sendEmail);

module.exports = router;
