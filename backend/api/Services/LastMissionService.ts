import LastMissionDto from "../Dtos/LastMissionDto";

interface LastMissionService {

    index(userId: number): Promise<LastMissionDto[]>;

    get(animalId: number, userId: number): Promise<LastMissionDto>;

}

export default LastMissionService;