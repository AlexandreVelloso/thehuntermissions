import BaseRepository from "./BaseRepository";
import UserObjectiveModel from "../../database/models/UserObjectiveModel";

interface UserObjectiveRepository extends BaseRepository<UserObjectiveModel> {

    findByObjectiveAndUser(objectiveId: number, userId: number): Promise<UserObjectiveModel>

    update(objectiveId: number, userId: number, isObjectiveCompleted: boolean): Promise<void>;

    insert(objectiveId: number, userId: number, isObjectiveCompleted: boolean): Promise<void>;

}

export default UserObjectiveRepository;