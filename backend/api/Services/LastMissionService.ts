import LastMission from "../Models/LastMission";

interface LastMissionService {

    index(userId: number): Promise<LastMission[]>;

    get(animalId: number, userId: number): Promise<LastMission>;

}

export default LastMissionService;