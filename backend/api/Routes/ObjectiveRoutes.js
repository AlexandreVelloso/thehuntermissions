const express = require('express');

const router = express.Router();

const ObjectiveController = require('../Controllers/ObjectiveController');

router.get('/objectives', ObjectiveController.index);
router.get('/objectives/:id', ObjectiveController.get);
router.put('/objectives/:id', ObjectiveController.update);

module.exports = router;
