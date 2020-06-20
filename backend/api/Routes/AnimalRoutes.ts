import { Router } from 'express';
import { AwilixContainer } from 'awilix';

import AnimalController from '../Controllers/AnimalController';

function createAnimalRoutes(container: AwilixContainer): Router {
    const router = Router();

    const animalController: AnimalController = container.resolve('animalController');

    router.get('/animals', (req, res) => animalController.index(req, res));
    router.get('/animals/:id', (req, res) => animalController.get(req, res));

    return router;
}

export default createAnimalRoutes;
