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

async function findObjectivesByName(weapon) {
    return Objective.query()
        .where('name', 'like', `%${weapon}%`)
        .select('*');
}

async function addWeaponsObjectives(knex, weapons, objectives) {
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

async function createObjectiveWeapon(knex, weaponName) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            weaponName,
        ]);

    const objectives = await findObjectivesByName(weaponName);

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot17HMRHV(knex) {
    const ammo = await findAmmoByName('.17 HMR HV Ammunition');

    const weapons = await Weapon.query()
        .select('weapons.*')
        .join('weapons_ammos', 'weapons_ammos.weapon_id', 'weapons.id')
        .where('ammo_id', ammo.id);

    const objectives = await findObjectivesByName('17 HMR HV Ammunition');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot308SingleShotHandgun(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '308 "Highwayman" Handgun',
            '308 "Rival" Handgun',
            '308 "Wolfsbane" Handgun',
        ]);

    const objectives = await findObjectivesByName('308 Single Shot Handgun');

    addWeaponsObjectives(knex, weapons, objectives);
}

async function dot4570Government(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '45-70 Government Lever Action Rifle',
        ]);

    const objectives = await findObjectivesByName('45-70 Government');
    const objectives2 = await findObjectivesByName('45-70 Lever Action Rifle');

    addWeaponsObjectives(knex, weapons, objectives);
    addWeaponsObjectives(knex, weapons, objectives2);
}

async function dot7mmBreakActionRifle(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '7mm Magnum Break Action Rifle',
            '7mm Magnum Bullpup Rifle',
        ]);

    const objectives = await findObjectivesByName('7mm Break Action Rifle');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function tracerArrows(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            'Snakebite Compound Bow',
            'Parker Python Compound Bow',
            'Compound Bow Red Dragon',
            'Compound Bow Pulsar',
            'Heavy Recurve Bow',
            'Recurve Bow',
            'Tenpoint Carbon Fusion Crossbow',
            'Reverse Draw Crossbow',
        ]);

    const objectives = await findObjectivesByName('tracer arrow');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot7mmAmmunition(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '7mm Magnum Bullpup Rifle',
            '7mm Magnum Break Action Rifle',
        ]);

    const objectives = await findObjectivesByName('7 mm ammunition');
    const objectives2 = await findObjectivesByName('7mm Magnum ammunition');

    await addWeaponsObjectives(knex, weapons, objectives);
    await addWeaponsObjectives(knex, weapons, objectives2);
}

async function anyShotgun(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '10 GA Lever Action Shotgun',
            '12 GA Pump Action Shotgun',
            '12 GA Side by Side Shotgun',
            '12 GA Blaser F3 Game O/U Shotgun',
            '12 GA Single Shot Shotgun',
            '16 GA Side By Side Shotgun',
            '20 GA Semi-Automatic Shotgun',
            '16GA/9.3x74R Drilling',
        ]);

    const objectives = await findObjectivesByName('any shotgun');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function buckshot(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '10 GA Lever Action Shotgun',
            '12 GA Pump Action Shotgun',
            '12 GA Side by Side Shotgun',
            '12 GA Blaser F3 Game O/U Shotgun',
            '12 GA Single Shot Shotgun',
            '16 GA Side By Side Shotgun',
            '20 GA Semi-Automatic Shotgun',
            '16GA/9.3x74R Drilling',
        ]);

    const objectives = await findObjectivesByName('buckshot');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function slug(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '10 GA Lever Action Shotgun',
            '12 GA Pump Action Shotgun',
            '12 GA Side by Side Shotgun',
            '12 GA Blaser F3 Game O/U Shotgun',
            '12 GA Single Shot Shotgun',
            '16GA/9.3x74R Drilling',
        ]);

    const objectives = await findObjectivesByName('slug');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function anyBow(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            'Heavy Recurve Bow',
            'Recurve Bow',
            'Longbow',
            'Cable-backed Bow',
        ]);

    const objectives = await findObjectivesByName('any bow');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function anyCompoundBow(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            'Snakebite Compound Bow',
            'Parker Python Compound Bow',
            'Compound Bow Pulsar',
            'Compound Bow Red Dragon',
        ]);

    const objectives = await findObjectivesByName('any Compound Bow');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function anyCrossbow(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            'Crossbow Pistol',
            'Reverse Draw Crossbow',
            'Tenpoint Carbon Fusion Crossbow',
        ]);

    const objectives = await findObjectivesByName('any crossbow');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function bowOrCrossbow(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            'Crossbow Pistol',
            'Reverse Draw Crossbow',
            'Tenpoint Carbon Fusion Crossbow',
            'Heavy Recurve Bow',
            'Recurve Bow',
            'Longbow',
            'Cable-backed Bow',
        ]);

    const objectives = await findObjectivesByName('bow or crossbow');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function bisonRevolvers(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '454 Revolver',
        ]);

    const objectives = await findObjectivesByName('Harvest the male Bison "Buffalo Bill" last seen at the "Windy Hill" (X: -6464, Y: -10096) using any permitted revolver without a scope.');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot300Rifle(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '300 Bolt Action Rifle',
        ]);

    const objectives = await findObjectivesByName('.300 Rifle');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function pumpAction(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '12 GA Pump Action Shotgun',
        ]);

    const objectives = await findObjectivesByName('Pump-Action Shotgun');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot308Anschuts(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '308 Anschütz 1780 D FL Bolt Action Rifle',
        ]);

    const objectives = await findObjectivesByName('308 Anschütz Rifle');

    await addWeaponsObjectives(knex, weapons, objectives);
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
            await tracerArrows(knex);
            await dot7mmAmmunition(knex);
            await anyShotgun(knex);
            await buckshot(knex);
            await slug(knex);
            await anyBow(knex);
            await anyCompoundBow(knex);
            await anyCrossbow(knex);
            await bowOrCrossbow(knex);
            await bisonRevolvers(knex);
            await dot300Rifle(knex);
            await pumpAction(knex);
            await dot308Anschuts(knex);
        });
};
