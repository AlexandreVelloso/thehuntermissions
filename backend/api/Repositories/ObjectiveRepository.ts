import BaseRepository from "./BaseRepository";
import ObjectiveModel from "../../database/models/ObjectiveModel";

interface ObjectiveRepository extends BaseRepository<ObjectiveModel> {

    getObjectivesByUser(userId: any): Promise<ObjectiveModel[]>;

    findObjectiveByUser(objectiveId: any, userId: any): Promise<ObjectiveModel>;

}

export default ObjectiveRepository;