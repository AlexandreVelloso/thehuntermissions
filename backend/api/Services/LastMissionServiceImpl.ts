import { getAnimalsLastMission, getLastMission } from '../Utils/AnimalsMissions';
import AnimalService from './AnimalService';
import LastMissionService from './LastMissionService';
import AnimalModel from '../../database/models/AnimalModel';
import LastMission from '../Models/LastMission';

class LastMissionServiceImpl implements LastMissionService {

    private animalService: AnimalService;

    public constructor(animalService: AnimalService) {
        this.animalService = animalService;
    }

    async index(userId: number): Promise<LastMission[]> {
        const animals = await this.animalService
            .index(userId);

        return getAnimalsLastMission(animals);
    }

    async get(animalId: number, userId: number): Promise<LastMission> {
        const animal = await this.animalService
            .get(animalId, userId);

        animal.mission = getLastMission(animal.missions);
        delete animal.missions;

        return animal;
    }
}

export default LastMissionServiceImpl;
