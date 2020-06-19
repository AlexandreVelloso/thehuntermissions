import { Router } from 'express';

import JwtMiddleware from '../Middleware/JwtMiddleware';
import SwaggerRoutes from './SwaggerRoutes';
import AuthRoutes from './AuthRoutes';
import ForgotPasswordRoutes from './ForgotPasswordRoutes';
import AnimalRoutes from './AnimalRoutes';
import LastMissionRoutes from './LastMissionRoutes';
import WeaponRoutes from './WeaponRoutes';
import ObjectiveRoutes from './ObjectiveRoutes';
import MissionRoutes from './MissionRoutes';
import Error404Route from './Error404Route';

const router = Router();

router.use('/manage/health', JwtMiddleware.handle, (req, res) => {
    return res.json({ status: "UP" })
});

router.use('/api', SwaggerRoutes);
router.use('/api', AuthRoutes);
router.use('/api', ForgotPasswordRoutes);
router.use('/api', JwtMiddleware.handle, AnimalRoutes);
router.use('/api', JwtMiddleware.handle, LastMissionRoutes);
router.use('/api', JwtMiddleware.handle, WeaponRoutes);
router.use('/api', JwtMiddleware.handle, ObjectiveRoutes);
router.use('/api', JwtMiddleware.handle, MissionRoutes);
router.use('/api', Error404Route);

export default router;
