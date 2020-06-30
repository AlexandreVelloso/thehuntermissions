import { Response } from 'express';

import AnimalService from '../Services/AnimalService';
import BaseController from './BaseController';
import { LoginCredentials } from '../Dtos/UserCredentialsDto';
import AnimalDto from '../Dtos/AnimalDto';
import CacheService from '../Services/CacheService';
import BaseValidator from '../Validators/BaseValidator';

class AnimalController extends BaseController {

    private animalService: AnimalService;
    private cacheService: CacheService;
    private getValidator: BaseValidator;

    public constructor(opts: any) {
        super();

        this.animalService = opts.animalService;
        this.cacheService = opts.cacheService;
        this.getValidator = opts.getValidator;
    }

    private async indexAnimalsByUserId(userId: number): Promise<AnimalDto[]> {
        const animals = await this.animalService
            .index(userId);

        return animals;
    }

    protected async indexImpl(res: Response, user: LoginCredentials): Promise<any> {
        const key = `indexAnimal_${user.id}`;

        let animals: AnimalDto[];

        if (process.env.NODE_ENV === 'test') {
            animals = await this.indexAnimalsByUserId(user.id);
        } else {
            animals = await this.cacheService
                .get(key, async () => await this.indexAnimalsByUserId(user.id));
        }

        return this.ok(res, animals);
    }

    private async findAnimalByUserId(animalId: number, userId: number): Promise<AnimalDto> {
        const animal: AnimalDto = await this.animalService
            .get(animalId, userId);

        return animal;
    }

    protected async getImpl(req: any, res: Response, user: LoginCredentials): Promise<any> {
        const { id: animalId } = this.getValidator
            .validate(req);

        const key = `getAnimal_${animalId}_${user.id}`;

        let animal: AnimalDto;

        if (process.env.NODE_ENV === 'testing') {
            animal = await this.findAnimalByUserId(animalId, user.id);
        } else {
            animal = await this.cacheService
                .get(key, async () => await this.findAnimalByUserId(animalId, user.id));
        }

        return this.ok(res, animal);
    }

    protected async updateImpl(_req: any, res: Response, user: LoginCredentials): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default AnimalController;
