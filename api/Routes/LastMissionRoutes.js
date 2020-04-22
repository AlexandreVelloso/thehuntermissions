const express = require('express');

const router = express.Router();

const AnimalMissionController = require('../Controllers/LastMissionController');

router.get('/lastMissions', AnimalMissionController.index);
router.get('/lastMissions/:id', AnimalMissionController.get);

module.exports = router;
