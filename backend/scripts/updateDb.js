/* eslint-disable no-await-in-loop */
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const { Model } = require('objection');
const knex = require('../database/connection');

Model.knex(knex);

const UserWeapon = require('../database/models/UserWeapon');
const Weapon = require('../database/models/Weapon');
const User = require('../database/models/User');


function readCsv(filename) {
    const fileData = fs.readFileSync(filename, { encoding: 'utf8' });

    const records = parse(fileData, {
        columns: true,
    });

    return records;
}

async function findUserByEmail(email) {
    return User.query()
        .where('email', email)
        .first();
}

async function findWeaponByName(name) {
    return Weapon.query()
        .where('name', name)
        .first();
}

async function insertUserWeapon(user, weapon, haveWeapon) {
    const userWeaponDB = await UserWeapon.query()
        .where('weapon_id', weapon.id)
        .where('user_id', user.id)
        .first();

    if (userWeaponDB) {
        await UserWeapon.query()
            .where('weapon_id', weapon.id)
            .where('user_id', user.id)
            .patch({
                have_weapon: haveWeapon,
            });
    } else {
        await UserWeapon.query()
            .insert({
                weapon_id: weapon.id,
                user_id: user.id,
                have_weapon: haveWeapon,
            });
    }
}

async function updateUserWeapons() {
    const rows = readCsv('./updateCsvs/users_weapons.csv');

    for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];

        const user = await findUserByEmail(row.email);
        const weapon = await findWeaponByName(row.weapon_name);

        await insertUserWeapon(user, weapon, row.have_weapon);
    }

    console.log('User weapons updated');
}

async function updateDatabase() {
    await updateUserWeapons();
    await knex.destroy();
}

updateDatabase();
