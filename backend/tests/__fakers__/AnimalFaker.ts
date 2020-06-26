import faker from 'faker';

import AnimalModel from '../../database/models/AnimalModel';

export async function generateAnimal() {
    return await AnimalModel.query()
        .insert({
            name: faker.name.firstName(),
        });
}