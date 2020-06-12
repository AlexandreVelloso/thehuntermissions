import { Router } from 'express';
import JwtMiddleware from '../Middleware/JwtMiddleware';

const router = Router();

router.use('/api/test', JwtMiddleware.handle, (req, res) => {
    return res.json({ hello: "hello", body: req.body  })
});

router.use('/api', require('./SwaggerRoutes').default);
router.use('/api', require('./AuthRoutes').default);
router.use('/api', require('./ForgotPasswordRoutes').default);
router.use('/api', JwtMiddleware.handle, require('./AnimalRoutes').default);
router.use('/api', JwtMiddleware.handle, require('./LastMissionRoutes').default);
router.use('/api', JwtMiddleware.handle, require('./WeaponRoutes').default);
router.use('/api', JwtMiddleware.handle, require('./ObjectiveRoutes').default);
router.use('/api', JwtMiddleware.handle, require('./MissionRoutes').default);
router.use('/api', require('./Error404Route').default);

export default router;
