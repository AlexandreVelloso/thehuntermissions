import LastMissionService from '../Services/LastMissionService';
import BaseController from './BaseController';

class LastMissionController extends BaseController {
    
    protected async indexImpl(user: any): Promise<any> {
        const animals = await LastMissionService.index(user.id);

        return this.ok(animals);
    }

    protected async getImpl(user: any): Promise<any> {
        const { id: animalId } = this.req.params;

        const animal = await LastMissionService.get(animalId, user.id);

        return this.ok(animal);
    }

    protected updateImpl(user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default LastMissionController;
