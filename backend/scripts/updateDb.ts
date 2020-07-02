/* eslint-disable no-await-in-loop */
import parse from 'csv-parse/lib/sync';
import fs from 'fs';
import appRoot from 'app-root-path';

import { Model } from 'objection';
import knex from '../database/connection';

import UserWeaponModel from '../database/models/UserWeaponModel';
import WeaponModel from '../database/models/WeaponModel';
import UserModel from '../database/models/UserModel';
import ObjectiveModel from '../database/models/ObjectiveModel';
import UserObjectiveModel from '../database/models/UserObjectiveModel';
import { LoginCredentials } from '../api/Dtos/UserCredentialsDto';

function readCsv(filename: string) {
    const fileData = fs.readFileSync(filename, {
        encoding: 'utf8',
    });

    const records = parse(fileData, {
        columns: true,
    });

    return records;
}

async function findUserByEmail(email: string) {
    return UserModel.query()
        .where('email', email)
        .first();
}

async function findWeaponByName(name: string) {
    return WeaponModel.query()
        .where('name', name)
        .first();
}

async function insertUserWeapon(user: LoginCredentials, weapon: WeaponModel, haveWeapon: boolean) {
    const userWeaponDB = await UserWeaponModel.query()
        .where('weapon_id', weapon.id)
        .where('user_id', user.id)
        .first();

    if (userWeaponDB) {
        await UserWeaponModel.query()
            .where('weapon_id', weapon.id)
            .where('user_id', user.id)
            .patch({
                have_weapon: haveWeapon,
            });
    } else {
        await UserWeaponModel.query()
            .insert({
                weapon_id: weapon.id,
                user_id: user.id,
                have_weapon: haveWeapon,
            });
    }
}

async function findObjectivesByName(name: string, numberOfObjectives: number) {
    return ObjectiveModel.query()
        .where('name', name)
        .limit(numberOfObjectives);
}

async function insertObjectives(user: LoginCredentials, objectives: ObjectiveModel[], completed: boolean) {
    for (let index = 0; index < objectives.length; index += 1) {
        const objective = objectives[index];

        const userObjectiveDB = await UserObjectiveModel.query()
            .where('user_id', user.id)
            .where('objective_id', objective.id)
            .first();

        if (userObjectiveDB) {
            await UserObjectiveModel.query()
                .where('objective_id', objective.id)
                .where('user_id', user.id)
                .patch({
                    completed,
                });
        } else {
            await UserObjectiveModel.query()
                .insert({
                    objective_id: objective.id,
                    user_id: user.id,
                    completed,
                });
        }
    }
}

async function updateUsers() {
    const rows = readCsv(`${appRoot}/scripts/updateCsvs/users.csv`);

    for (let i = 0; i < rows.length; i += 1) {
        const { id, username, email, password, refresh_token, created_at, updated_at } = rows[i];

        const user = await findUserByEmail(email);

        if (!user) {
            await knex('users')
                .insert({
                    id,
                    username,
                    email,
                    password,
                    refresh_token,
                    created_at,
                    updated_at,
                });
        }
    }
}

async function updateUserWeapons() {
    const rows = readCsv(`${appRoot}/scripts/updateCsvs/users_weapons.csv`);

    for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];

        const user = await findUserByEmail(row.email);
        const weapon = await findWeaponByName(row.weapon_name);

        await insertUserWeapon(user, weapon, row.have_weapon);
    }
}

async function updateUserObjectives() {
    const rows = readCsv(`${appRoot}/scripts/updateCsvs/users_objectives.csv`);

    for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];

        const user = await findUserByEmail(row.email);
        const objectives = await findObjectivesByName(row.objective_name, row.count_duplicated);

        await insertObjectives(user, objectives, row.completed);
    }
}

async function updateDatabase() {
    Model.knex(knex);

    await updateUsers();
    await updateUserWeapons();
    await updateUserObjectives();
    await knex.destroy();
}

updateDatabase();
