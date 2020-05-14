const express = require('express');

const router = express.Router();

const AuthController = require('../Controllers/AuthController');

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.post('/auth/resetPassword', AuthController.resetPassword);

module.exports = router;
