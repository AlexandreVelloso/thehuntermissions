import MissionDto from "../Dtos/MissionDto";

interface MissionService {

    index(userId: number): Promise<MissionDto[]>;

    get(missionId: number, userId: number): Promise<MissionDto>;

    update(missionId: number, missionCompleted: boolean, userId: number): Promise<void>;

}

export default MissionService;