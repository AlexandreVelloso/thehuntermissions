import { Router } from 'express';

import AnimalController from '../Controllers/AnimalController';
import AnimalServiceImpl from '../Services/AnimalServiceImpl';
import AnimalRepositoryImpl from '../Repositories/AnimalRepositoryImpl';

const router = Router();

const animalController = new AnimalController(
    new AnimalServiceImpl(
        new AnimalRepositoryImpl()
    )
);

router.get('/animals', (req, res) => animalController.index(req, res));
router.get('/animals/:id', (req, res) => animalController.get(req, res));

export default router;
