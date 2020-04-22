const express = require('express');

const router = express.Router();

const WeaponController = require('../Controllers/WeaponController');

router.get('/weapons', WeaponController.index);

module.exports = router;
