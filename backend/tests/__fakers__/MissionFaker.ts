import faker from 'faker';

import MissionModel from '../../database/models/MissionModel';

export async function generateMission(missionId?: number, animalId?: number) {
    return await MissionModel.query()
        .insert({
            id: missionId,
            name: faker.name.firstName(),
            reward: faker.random.number(3600),
            hint: faker.lorem.words(5),
            animal_id: animalId ? animalId : faker.random.number(100),
        });
}