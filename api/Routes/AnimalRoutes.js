const express = require('express');

const router = express.Router();

const AnimalController = require('../Controllers/AnimalController');

router.get('/animals', AnimalController.index);
router.get('/animals/:id', AnimalController.get);

module.exports = router;
