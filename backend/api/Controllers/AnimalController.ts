import { Response } from 'express';

import AnimalService from '../Services/AnimalService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import AnimalDto from '../Dtos/AnimalDto';

class AnimalController extends BaseController {

    private animalService: AnimalService;

    public constructor(animalService: AnimalService) {
        super();

        this.animalService = animalService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials): Promise<any> {
        const animals: AnimalDto[] = await this.animalService
            .index(user.id);

        return this.ok(res, animals);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const animalId = req.params.id;

        const animal: AnimalDto = await this.animalService
            .get(animalId, user.id);

        return this.ok(res, animal);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default AnimalController;
