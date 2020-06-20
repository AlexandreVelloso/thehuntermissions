import { Router } from 'express';

import JwtMiddleware from '../Middleware/JwtMiddleware';
import SwaggerRoutes from './SwaggerRoutes';
import createAuthRoutes from './AuthRoutes';
import createForgotPasswordRoutes from './ForgotPasswordRoutes';
import createAnimalRoutes from './AnimalRoutes';
import createLastMissionRoutes from './LastMissionRoutes';
import createWeaponRoutes from './WeaponRoutes';
import createObjectiveRoutes from './ObjectiveRoutes';
import createMissionRoutes from './MissionRoutes';
import Error404Route from './Error404Route';
import createAppContainer from '../createContainer';

const router = Router();
const container = createAppContainer();

router.use('/manage/health', JwtMiddleware.handle, (_req, res) => {
    return res.json({ status: "UP" });
});

router.use('/api', SwaggerRoutes);
router.use('/api', createAuthRoutes(container));
router.use('/api', createForgotPasswordRoutes(container));
router.use('/api', JwtMiddleware.handle, createAnimalRoutes(container));
router.use('/api', JwtMiddleware.handle, createLastMissionRoutes(container));
router.use('/api', JwtMiddleware.handle, createWeaponRoutes(container));
router.use('/api', JwtMiddleware.handle, createObjectiveRoutes(container));
router.use('/api', JwtMiddleware.handle, createMissionRoutes(container));
router.use('/api', Error404Route);

export default router;
