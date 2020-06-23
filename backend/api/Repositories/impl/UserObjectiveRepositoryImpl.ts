import UserObjectiveRepository from "../UserObjectiveRepository";
import UserObjectiveModel from "../../../database/models/UserObjectiveModel";
import { Transaction } from "objection";

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
        await UserObjectiveModel.transaction(async (trx: Transaction) => {
            await UserObjectiveModel.query(trx)
                .where('objective_id', objectiveId)
                .where('user_id', userId)
                .patch({
                    completed: isObjectiveCompleted,
                });
        });
    }

    async insert(objectiveId: number, userId: number, isObjectiveCompleted: boolean): Promise<void> {
        await UserObjectiveModel.transaction(async (trx: Transaction) => {
            await UserObjectiveModel.query(trx)
                .insert({
                    objective_id: objectiveId,
                    user_id: userId,
                    completed: isObjectiveCompleted,
                });
        });
    }

    async getObjectivesByUserWhereObjectivesIn(userId: number, objectivesIds: number[]): Promise<UserObjectiveModel[]> {
        return await UserObjectiveModel.query()
            .where('user_id', userId)
            .where('objective_id', 'in', objectivesIds)
    }

    async updateMany(objectivesIds: number[], completed: boolean): Promise<void> {
        await UserObjectiveModel.transaction(async (trx: Transaction) => {
            await UserObjectiveModel.query(trx)
                .where('objective_id', 'in', objectivesIds)
                .update({ completed });
        });
    }

    async insertMany(userObjectives: any[]): Promise<void> {
        await UserObjectiveModel.transaction(async (trx: Transaction) => {
            await UserObjectiveModel.query(trx)
                .insertGraph(userObjectives);
        });
    }

}

export default UserObjectiveRepositoryImpl;