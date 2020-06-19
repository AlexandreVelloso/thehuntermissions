import BaseRepository from "./BaseRepository";
import ObjectiveModel from "../../database/models/ObjectiveModel";

interface ObjectiveRepository extends BaseRepository<ObjectiveModel> {

    findObjectiveByUser(objectiveId: any, userId: any): Promise<ObjectiveModel>;

    getObjectivesByUser(userId: any): Promise<ObjectiveModel[]>;

    getObjectivesByMissionId(missionId: number): Promise<ObjectiveModel[]>;
    
}

export default ObjectiveRepository;