import faker from 'faker';

import WeaponModel from '../../database/models/WeaponModel';

export async function generateWeapon(weaponId?: number) {
    return await WeaponModel.query()
        .insert({
            id: weaponId ? weaponId : faker.random.number(100),
            name: faker.name.firstName(),
            price: faker.random.number(1000),
        });
}