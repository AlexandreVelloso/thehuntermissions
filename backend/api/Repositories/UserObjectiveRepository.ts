import BaseRepository from "./BaseRepository";
import UserObjectiveModel from "../../database/models/UserObjectiveModel";

interface UserObjectiveRepository extends BaseRepository<UserObjectiveModel> {

    findByObjectiveAndUser(objectiveId: number, userId: number): Promise<UserObjectiveModel>

    getObjectivesByUserWhereObjectivesIn(userId: number, objectivesIds: number[]): Promise<UserObjectiveModel[]>;

    insert(objectiveId: number, userId: number, isObjectiveCompleted: boolean): Promise<void>;    

    insertMany(userObjectives: any[]): Promise<void>;

    update(objectiveId: number, userId: number, isObjectiveCompleted: boolean): Promise<void>;    

    updateMany(objectivesIds: number[], objectiveCompleted: boolean): Promise<void>;

}

export default UserObjectiveRepository;