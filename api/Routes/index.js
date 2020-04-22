const express = require('express');

const router = express.Router();

const jwtMiddleware = require('../Middleware/jwtMiddleware');

router.use('/api', require('./SwaggerRoutes'));
router.use('/api', require('./AuthRoutes'));
router.use('/api', jwtMiddleware, require('./AnimalRoutes'));
router.use('/api', jwtMiddleware, require('./LastMissionRoutes'));
router.use('/api', jwtMiddleware, require('./WeaponRoutes'));
router.use('/api', jwtMiddleware, require('./ObjectiveRoutes'));
router.use('/api', jwtMiddleware, require('./MissionRoutes'));
router.use('/api', require('./Error404Route'));

module.exports = router;
