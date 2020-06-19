import BaseRepository from "./BaseRepository";
import MissionModel from "../../database/models/MissionModel";

interface MissionRepository extends BaseRepository<MissionModel> {

    findMissionByUser(missionId: number, userId: any): Promise<MissionModel>;

    getMissionsByUser(userId: any): Promise<MissionModel[]>;

}

export default MissionRepository;