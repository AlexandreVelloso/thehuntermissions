import faker from 'faker';

import WeaponModel from '../../database/models/WeaponModel';

export async function generateWeapon(weaponId?: number) {
    return WeaponModel.query()
        .insert({
            id: weaponId,
            name: faker.name.firstName(),
            price: faker.random.number(1000),
        });
}