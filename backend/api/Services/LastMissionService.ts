import { getAnimalsLastMission, getLastMission } from '../Utils/AnimalsMissions';
import AnimalService from './AnimalService';

class LastMissionService {
    static async index(userId: string) {
        const animals = await AnimalService.index(userId);

        return getAnimalsLastMission(animals);
    }

    static async get(animalId: string, userId: string) {
        const animal = await AnimalService.get(animalId, userId);

        animal.mission = getLastMission(animal.missions);
        delete animal.missions;

        return animal;
    }
}

export default LastMissionService;
