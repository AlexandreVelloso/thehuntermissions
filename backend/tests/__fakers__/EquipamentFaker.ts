import faker from 'faker';

import EquipamentModel from '../../database/models/EquipamentModel';

export async function generateEquipament(equipamentId: number) {
    return EquipamentModel.query()
        .insert({
            id: equipamentId,
            name: faker.name.firstName(),
            price: faker.random.number(1000),
        });
}