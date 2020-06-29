import faker from 'faker';

import UserModel from '../../database/models/UserModel';

export async function generateUser(username?: string, email?: string) {
    return await UserModel.query()
        .insert({
            username: username ? username : faker.internet.userName(),
            email: email ? email : faker.internet.email(),
            password: faker.internet.password(10),
            refresh_token: faker.random.word(),
        });
}

export async function generateUserWithDefaultPassword(username?: string, email?: string) {
    return await UserModel.query()
        .insert({
            username: username ? username : faker.internet.userName(),
            email: email ? email : faker.internet.email(),
            password: '1234',
            refresh_token: faker.random.word(),
        });
}