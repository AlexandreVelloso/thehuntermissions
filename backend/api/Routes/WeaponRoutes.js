const express = require('express');

const router = express.Router();

const WeaponController = require('../Controllers/WeaponController');

router.get('/weapons', WeaponController.index);
router.get('/weapons/:id', WeaponController.get);
router.put('/weapons/:id', WeaponController.update);

module.exports = router;
