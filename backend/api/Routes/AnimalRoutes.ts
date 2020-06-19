import { Router } from 'express';

import AnimalController from '../Controllers/AnimalController';

const router = Router();

const animalController = new AnimalController();

router.get('/animals', (req, res) => animalController.index(req, res));
router.get('/animals/:id', (req, res) => animalController.get(req, res));

export default router;
