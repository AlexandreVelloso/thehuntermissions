import { getAnimalsLastMission, getLastMission } from '../../Utils/AnimalsMissions';
import AnimalService from '../AnimalService';
import LastMissionService from '../LastMissionService';
import AnimalDto from '../../Dtos/AnimalDto';
import LastMissionDto from '../../Dtos/LastMissionDto';

class LastMissionServiceImpl implements LastMissionService {

    private animalService: AnimalService;

    public constructor(opts: any) {
        this.animalService = opts.animalService;
    }

    async index(userId: number): Promise<LastMissionDto[]> {
        const animals: AnimalDto[] = await this.animalService
            .index(userId);

        return getAnimalsLastMission(animals);
    }

    async get(animalId: number, userId: number): Promise<LastMissionDto> {
        const animal: AnimalDto = await this.animalService
            .get(animalId, userId);

        const lastMission = getLastMission(animal.missions);

        const lastMissionDto = new LastMissionDto(
            animal.id,
            animal.name,
            lastMission,
            animal.created_at,
            animal.updated_at
        );

        return lastMissionDto;
    }
}

export default LastMissionServiceImpl;
