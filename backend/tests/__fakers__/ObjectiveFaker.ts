import faker from 'faker';

import ObjectiveModel from '../../database/models/ObjectiveModel';

export async function generateObjective(missionId?: number) {
    const missionIdDb = missionId ? missionId : faker.random.number(100);

    return await ObjectiveModel.query()
        .insert({
            name: faker.name.firstName(),
            mission_id: missionIdDb,
            created_at: '',
            updated_at: '',
        });
}