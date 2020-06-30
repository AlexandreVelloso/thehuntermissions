import faker from 'faker';

import AnimalModel from '../../database/models/AnimalModel';

export async function generateAnimal(animalId?: number) {
    return await AnimalModel.query()
        .insert({
            id: animalId,
            name: faker.name.firstName(),
        });
}