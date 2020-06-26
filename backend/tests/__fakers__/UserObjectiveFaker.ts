import faker from 'faker';

import UserObjectiveModel from '../../database/models/UserObjectiveModel';

export async function generateUserObjective(userId?: number, objectiveId?: number, objectiveCompleted?: boolean) {
    let completed: boolean | undefined = faker.random.boolean();

    if (completed !== undefined) {
        completed = objectiveCompleted;
    }

    return await UserObjectiveModel.query()
        .insert({
            user_id: userId ? userId : faker.random.number(100),
            objective_id: objectiveId ? objectiveId : faker.random.number(100),
            completed: completed
        });
}