import AnimalService from '../Services/AnimalService';
import BaseController from './BaseController';

class AnimalController extends BaseController {
    
    protected async indexImpl(user: any): Promise<any> {
        const animals = await AnimalService.index(user.id);

        return this.ok(animals);
    }

    protected async getImpl(user: any): Promise<any> {
        const animalId = String(this.req.params.id);

        const animal = await AnimalService.get(animalId, user.id);

        return this.ok(animal);
    }

    protected async updateImpl(user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}

export default AnimalController;
