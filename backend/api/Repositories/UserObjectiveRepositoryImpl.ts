import UserObjectiveRepository from "./UserObjectiveRepository";
import UserObjectiveModel from "../../database/models/UserObjectiveModel";

class UserObjectiveRepositoryImpl implements UserObjectiveRepository {

    async findById(id: number): Promise<UserObjectiveModel> {
        return await UserObjectiveModel.query()
            .where('id', id)
            .first();
    }

    async findByObjectiveAndUser(objectiveId: number, userId: number): Promise<UserObjectiveModel> {
        return await UserObjectiveModel.query()
            .where('objective_id', objectiveId)
            .where('user_id', userId)
            .first();
    }

    async update(objectiveId: number, userId: number, isObjectiveCompleted: boolean): Promise<void> {
        await UserObjectiveModel.query()
            .where('objective_id', objectiveId)
            .where('user_id', userId)
            .patch({
                completed: isObjectiveCompleted,
            });
    }

    async insert(objectiveId: number, userId: number, isObjectiveCompleted: boolean): Promise<void> {
        await UserObjectiveModel.query()
            .insert({
                objective_id: objectiveId,
                user_id: userId,
                completed: isObjectiveCompleted,
            });
    }

}

export default UserObjectiveRepositoryImpl;