const express = require('express');

const router = express.Router();

const AuthController = require('../Controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/resetPassword', AuthController.resetPassword);

module.exports = router;
