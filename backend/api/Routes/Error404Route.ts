import { Router } from 'express';

const router = Router();

router.all('*', (_req, res) => res.status(404).end());

export default router;
