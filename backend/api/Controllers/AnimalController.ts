import { Response } from 'express';

import AnimalService from '../Services/AnimalService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import AnimalDto from '../Dtos/AnimalDto';
import CacheService from '../Services/CacheService';

class AnimalController extends BaseController {

    private animalService: AnimalService;
    private cacheService: CacheService;

    public constructor(opts: any) {
        super();

        this.animalService = opts.animalService;
        this.cacheService = opts.cacheService;
    }

    protected async indexImpl(_req: any, res: Response, user: LoginCredentials): Promise<any> {
        const key = `indexAnimal_${user.id}`;

        const result = await this.cacheService
            .get(key, async () => {
                const animals: AnimalDto[] = await this.animalService
                    .index(user.id);

                return animals;
            });

        return this.ok(res, result);
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const animalId = req.params.id;

        const key = `getAnimal_${animalId}_${user.id}`;

        const result = await this.cacheService
            .get(key, async () => {
                const animal: AnimalDto = await this.animalService
                    .get(animalId, user.id);

                return animal;
            });

        return this.ok(res, result);
    }

    protected async updateImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default AnimalController;
