const express = require('express');

const router = express.Router();

const MissionController = require('../Controllers/MissionController');

router.get('/missions', MissionController.index);
router.get('/missions/:id', MissionController.get);
router.put('/missions/:id', MissionController.update);

module.exports = router;
