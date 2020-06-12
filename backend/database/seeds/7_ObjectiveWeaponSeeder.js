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

async function createObjectivesWeaponsForAllWeapons(knex) {
    const weapons = await Weapon.query();

    await weapons.forEach(async (weapon) => {
        const objectives = await findObjectivesByName(weapon.name);
        await addWeaponsObjectives(knex, [weapon], objectives);
    });
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

async function dot308RivalHandgun(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '308 "Rival" Handgun',
        ]);

    const objectives = await findObjectivesByName('308 "Rival" Handgun');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function any243or223(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '243 Bolt Action Rifle',
            '223 Bolt Action Rifle',
            '223 Semi-Automatic Rifle',
        ]);

    const objectives = await findObjectivesByName('any .243 or .223 rifle');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function arcticFoxRevolvers(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '357 Revolver',
        ]);

    const objectives = await findObjectivesByName('Harvest an Arctic Fox with any permitted revolver.');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function snakebiteMissions(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            'Snakebite Compound Bow',
        ]);

    const objectives = await findObjectivesByName('"Snakebite" Compound Bow');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot223Ammunition(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '223 Bolt Action Rifle',
            '223 Semi-Automatic Rifle',
        ]);

    const objectives = await findObjectivesByName('223 ammunition');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot22Ammunition(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '22 Pistol',
            '22 Semi-Automatic Rifle'
        ]);

        const objectives = await findObjectivesByName('.22 ammo');

        await addWeaponsObjectives(knex, weapons, objectives);
}

async function feralGoatPistols(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '357 Revolver',
            '10mm Semi-Automatic Pistol',
            '44 Magnum Revolver',
            '50 Inline Muzzleloading Pistol',
        ]);

    const objectives = await findObjectivesByName('Harvest a Feral Goat with 100% Harvest Value, using any ethical pistol or revolver.');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function parkerPython(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            'Parker Python Compound Bow',
        ]);

    const objectives = await findObjectivesByName('Compound Bow "Parker Python');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function sideBySide(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            'SxS Shotgun',
        ]);

    const objectives = await findObjectivesByName('Side by Side shotgun');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot270rifle(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '270 Bolt Action Rifle',
        ]);

    const objectives = await findObjectivesByName('.270 rifle');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot3006rifle(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '30-06 Bolt Action Rifle',
            '30-06 Lever Action Rifle',
            '30-06 Stutzen Bolt Action Rifle',
        ]);

    const objectives = await findObjectivesByName('.30-06 rifle');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot357Handgun(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '357 Revolver',
        ]);

    const objectives = await findObjectivesByName('.357 Handgun');
    const objectives2 = await findObjectivesByName('.357 Magnum');

    await addWeaponsObjectives(knex, weapons, objectives);
    await addWeaponsObjectives(knex, weapons, objectives2);
}

async function k98kBoltActionRifle(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '8x57 IS K98k Bolt Action Rifle',
        ]);

    const objectives = await findObjectivesByName('8x57 K98k Bolt Action Rifle');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function anschtzRifle(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '8x57 IS Anschütz 1780 D FL Bolt Action Rifle',
            '9.3x62 Anschütz 1780 D FL Bolt Action Rifle',
            '308 Anschütz 1780 D FL Bolt Action Rifle',
        ]);

    const objectives = await findObjectivesByName('Anchütz rifle');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot8x57Ammunition(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '8x57 IS Anschütz 1780 D FL Bolt Action Rifle',
            '8x57 IS K98k Bolt Action Rifle',
        ]);

    const objectives = await findObjectivesByName('8x57 ammunition');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function any4570Rifle(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '45-70 Buffalo Rifle',
            '45-70 Government Lever Action Rifle',
        ]);

    const objectives = await findObjectivesByName('.45-70 rifle');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot3006Ammunition(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '30-06 Bolt Action Rifle',
            '30-06 Lever Action Rifle',
            '30-06 Stutzen Bolt Action Rifle',
        ]);

    const objectives = await findObjectivesByName('.30-06 ammunition');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function rockMountainElkPermitedRifle(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '45-70 Buffalo Rifle',
            '45-70 Government Lever Action Rifle',
            '405 Lever Action Rifle',
            '340 Weatherby Magnum Bolt Action Rifle',
            '300 Bolt Action Rifle',
            '9.3x62 Anschütz 1780 D FL Bolt Action Rifle',
            '9.3x74R O/U Break Action Rifle',
            '7mm Magnum Break Action Rifle',
            '7mm Magnum Bullpup Rifle',
            '30 R O/U Break Action Rifle',
            '8x57 IS Anschütz 1780 D FL Bolt Action Rifle',
            '8x57 IS K98k Bolt Action Rifle',
            '303 British Bolt Action Rifle',
            '308 Bolt Action Rifle',
            '30-06 Lever Action Rifle',
            '30-06 Bolt Action Rifle',
            '30-06 Stutzen Bolt Action Rifle',
            '7.62x54R Bolt Action Rifle',
            '7x64mm Bolt Action Rifle',
            '7mm-08 Scout Bolt Action Rifle',
        ]);

    const objectives = await findObjectivesByName('Harvest a male Rocky Mountain Elk with more than 12 typical points using any ethical rifle ammunition.');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function dot454Ammunition(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '454 Revolver',
        ]);

    const objectives = await findObjectivesByName('.454 ammunition');

    await addWeaponsObjectives(knex, weapons, objectives);
}

async function waterBuffaloAnyMuzeloaderAmmunition(knex) {
    const weapons = await Weapon.query()
        .whereIn('name', [
            '50 Inline Muzzleloader',
            '50 Inline Muzzleloading Pistol',
        ]);

    const objectives = await findObjectivesByName('Finally, harvest a charging Water Buffalo with any ethical Muzzleloader ammo.');

    await addWeaponsObjectives(knex, weapons, objectives);
}

exports.seed = (knex) => {
    Model.knex(knex);

    return knex('objectives_weapons').del()
        .then(async () => {
            await createObjectivesWeaponsForAllWeapons(knex);
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
            await dot308RivalHandgun(knex);
            await any243or223(knex);
            await arcticFoxRevolvers(knex);
            await snakebiteMissions(knex);
            await dot223Ammunition(knex);
            await dot22Ammunition(knex);
            await feralGoatPistols(knex);
            await parkerPython(knex);
            await sideBySide(knex);
            await dot270rifle(knex);
            await dot357Handgun(knex);
            await k98kBoltActionRifle(knex);
            await anschtzRifle(knex);
            await dot8x57Ammunition(knex);
            await any4570Rifle(knex);
            await dot3006Ammunition(knex);
            await rockMountainElkPermitedRifle(knex);
            await dot454Ammunition(knex);
            await waterBuffaloAnyMuzeloaderAmmunition(knex);
            await dot3006rifle(knex);
        });
};
