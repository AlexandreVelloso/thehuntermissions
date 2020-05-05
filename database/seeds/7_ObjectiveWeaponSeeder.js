const { Model } = require('objection');

const Ammo = require('../models/Ammo');
const Weapon = require('../models/Weapon');
const Objective = require('../models/Objective');
const ObjectiveWeapon = require('../models/ObjectiveWeapon');

async function findAmmoByName(name) {
    return Ammo.query()
        .where('name', name)
        .first();
}

async function findWeaponBy(column, value) {
    return Weapon.query()
        .where(column, value)
        .select('*')
        .first();
}

async function findObjectivesByWeapon(weapon) {
    return Objective.query()
        .where('name', 'like', `%${weapon}%`)
        .select('*');
}

async function createObjectiveWeapon(knex, weaponName) {
    const weapon = await findWeaponBy('name', weaponName);
    const objectives = await findObjectivesByWeapon(weapon.name);

    const weaponObjectives = objectives.map((objective) => ({
        objective_id: objective.id,
        weapon_id: weapon.id,
    }));

    if (process.env.NODE_ENV === 'production') {
        await knex('objectives_weapons')
            .insert(weaponObjectives);
    } else {
        await ObjectiveWeapon.query()
            .insertGraph(weaponObjectives);
    }
}

async function dot17HMRHV(knex) {
    const ammo = await findAmmoByName('.17 HMR HV Ammunition');

    const weapons = await Weapon.query()
        .select('weapons.*')
        .join('weapons_ammos', 'weapons_ammos.weapon_id', 'weapons.id')
        .where('ammo_id', ammo.id);

    const objectives = await findObjectivesByWeapon('17 HMR HV Ammunition');

    const weaponObjectives = [];

    objectives.forEach((objective) => {
        weapons.forEach((weapon) => {
            weaponObjectives.push({
                objective_id: objective.id,
                weapon_id: weapon.id,
            });
        });
    });

    if (process.env.NODE_ENV === 'production') {
        await knex('objectives_weapons')
            .insert(weaponObjectives);
    } else {
        await ObjectiveWeapon.query()
            .insertGraph(weaponObjectives);
    }
}

async function dot308SingleShotHandgun(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '308 "Highwayman" Handgun',
            '308 "Rival" Handgun',
            '308 "Wolfsbane" Handgun',
        ]);

    const objectives = await findObjectivesByWeapon('308 Single Shot Handgun');

    const weaponObjectives = [];

    objectives.forEach((objective) => {
        weapons.forEach((weapon) => {
            weaponObjectives.push({
                objective_id: objective.id,
                weapon_id: weapon.id,
            });
        });
    });

    if (process.env.NODE_ENV === 'production') {
        await knex('objectives_weapons')
            .insert(weaponObjectives);
    } else {
        await ObjectiveWeapon.query()
            .insertGraph(weaponObjectives);
    }
}

async function dot4570Government(knex) {
    const weapon = await Weapon.query()
        .where('name', 'like', '%45-70 Government%')
        .first();

    const objectives = await findObjectivesByWeapon('45-70 Government');

    const weaponObjectives = objectives.map((objective) => ({
        objective_id: objective.id,
        weapon_id: weapon.id,
    }));

    if (process.env.NODE_ENV === 'production') {
        await knex('objectives_weapons')
            .insert(weaponObjectives);
    } else {
        await ObjectiveWeapon.query()
            .insertGraph(weaponObjectives);
    }
}

async function dot7mmBreakActionRifle(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '7mm Magnum Break Action Rifle',
            '7mm Magnum Bullpup Rifle',
        ]);

    const objectives = await findObjectivesByWeapon('7mm Break Action Rifle');

    const weaponObjectives = [];

    objectives.forEach((objective) => {
        weapons.forEach((weapon) => {
            weaponObjectives.push({
                objective_id: objective.id,
                weapon_id: weapon.id,
            });
        });
    });

    if (process.env.NODE_ENV === 'production') {
        await knex('objectives_weapons')
            .insert(weaponObjectives);
    } else {
        await ObjectiveWeapon.query()
            .insertGraph(weaponObjectives);
    }
}

exports.seed = (knex) => {
    Model.knex(knex);

    return knex('objectives_weapons').del()
        .then(async () => {
            await createObjectiveWeapon(knex, '12 GA Blaser F3 Game O/U Shotgun');
            await createObjectiveWeapon(knex, '12 GA Pump Action Shotgun');
            await createObjectiveWeapon(knex, '12 GA Single Shot Shotgun');
            await createObjectiveWeapon(knex, '20 GA Semi-Automatic Shotgun');
            await createObjectiveWeapon(knex, '22 Air Rifle');
            await createObjectiveWeapon(knex, '22 Pistol');
            await createObjectiveWeapon(knex, '223 Bolt Action Rifle');
            await createObjectiveWeapon(knex, '243 Bolt Action Rifle');
            await createObjectiveWeapon(knex, '270 Bolt Action Rifle');
            await createObjectiveWeapon(knex, '30-06 Lever Action Rifle');
            await createObjectiveWeapon(knex, '30-30 Lever Action Rifle');
            await createObjectiveWeapon(knex, '300 Bolt Action Rifle');
            await createObjectiveWeapon(knex, '303 British Bolt Action Rifle');
            await createObjectiveWeapon(knex, '308 Anschütz 1780 D FL Bolt Action Rifle');
            await createObjectiveWeapon(knex, '340 Weatherby Magnum Bolt Action Rifle');
            await createObjectiveWeapon(knex, '357 Revolver');
            await createObjectiveWeapon(knex, '44 Magnum Revolver');
            await createObjectiveWeapon(knex, '454 Revolver');
            await createObjectiveWeapon(knex, '50 Cap Lock Muzzleloader');
            await createObjectiveWeapon(knex, '6.5x55 Blaser R8 Bolt Action Rifle');
            await createObjectiveWeapon(knex, '7mm Magnum Bullpup Rifle');
            await createObjectiveWeapon(knex, '8x57 IS Anschütz 1780 D FL Bolt Action Rifle');
            await createObjectiveWeapon(knex, '8x57 IS K98k Bolt Action Rifle');
            await createObjectiveWeapon(knex, '9.3x62 Anschütz 1780 D FL Bolt Action Rifle');
            await createObjectiveWeapon(knex, 'Cable-backed Bow');
            await createObjectiveWeapon(knex, 'Crossbow Pistol');
            await createObjectiveWeapon(knex, 'Heavy Recurve Bow');
            await createObjectiveWeapon(knex, 'Inline Muzzleloader');
            await createObjectiveWeapon(knex, 'Longbow');
            await createObjectiveWeapon(knex, 'Parker Python Compound Bow');
            await createObjectiveWeapon(knex, 'Recurve Bow');
            await createObjectiveWeapon(knex, 'Snakebite Compound Bow');
            await createObjectiveWeapon(knex, 'SxS Shotgun');
            await createObjectiveWeapon(knex, 'Tenpoint Carbon Fusion Crossbow');
            await dot17HMRHV(knex);
            await dot308SingleShotHandgun(knex);
            await dot4570Government(knex);
            await dot7mmBreakActionRifle(knex);
        });
};
