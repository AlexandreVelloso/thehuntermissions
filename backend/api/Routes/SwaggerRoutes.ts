import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from '../config/swagger.json';

const router = Router();

router.get('/', (req, res) => res.redirect(301, '/api/api-docs'));
router.use('/api-docs', serve);
router.get('/api-docs', setup(swaggerDocument));

export default router;
