const { Model } = require('objection');

const Weapon = require('../models/Weapon');
const Objective = require('../models/Objective');
const ObjectiveWeapon = require('../models/ObjectiveWeapon');

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

async function createObjectiveWeapon(weaponName) {
    const weapon = await findWeaponBy('name', weaponName);
    const objectives = await findObjectivesByWeapon(weapon.name);

    const weaponObjectives = objectives.map((objective) => ({
        objective_id: objective.id,
        weapon_id: weapon.id,
    }));

    if (process.env.NODE_ENV === 'production') {
        await ObjectiveWeapon.query()
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
            await createObjectiveWeapon('12 GA Blaser F3 Game O/U Shotgun');
            await createObjectiveWeapon('12 GA Pump Action Shotgun');
            await createObjectiveWeapon('12 GA Single Shot Shotgun');
            await createObjectiveWeapon('17 HMR HV Ammunition');
            await createObjectiveWeapon('20 GA Semi-Automatic Shotgun');
            await createObjectiveWeapon('22 Air Rifle');
            await createObjectiveWeapon('22 Pistol');
            await createObjectiveWeapon('223 Bolt Action Rifle');
            await createObjectiveWeapon('243 Bolt Action Rifle');
            await createObjectiveWeapon('270 Bolt Action Rifle');
            await createObjectiveWeapon('30-06 Lever Action Rifle');
            await createObjectiveWeapon('30-30 Lever Action Rifle');
            await createObjectiveWeapon('300 Bolt Action Rifle');
            await createObjectiveWeapon('303 British Bolt Action Rifle');
            await createObjectiveWeapon('308 Anschütz 1780 D FL Bolt Action Rifle');
            await createObjectiveWeapon('308 Single Shot Handgun');
            await createObjectiveWeapon('340 Weatherby Magnum Bolt Action Rifle');
            await createObjectiveWeapon('357 Revolver');
            await createObjectiveWeapon('44 Magnum Revolver');
            await createObjectiveWeapon('45-70 Government');
            await createObjectiveWeapon('454 Revolver');
            await createObjectiveWeapon('50 Cap Lock Muzzleloader');
            await createObjectiveWeapon('6.5x55 Blaser R8 Bolt Action Rifle');
            await createObjectiveWeapon('7mm Break Action Rifle');
            await createObjectiveWeapon('7mm Magnum Bullpup Rifle');
            await createObjectiveWeapon('8x57 IS Anschütz 1780 D FL Bolt Action Rifle');
            await createObjectiveWeapon('8x57 IS K98k Bolt Action Rifle');
            await createObjectiveWeapon('9.3x62 Anschütz 1780 D FL Bolt Action Rifle');
            await createObjectiveWeapon('Cable-backed Bow');
            await createObjectiveWeapon('Crossbow Pistol');
            await createObjectiveWeapon('Heavy Recurve Bow');
            await createObjectiveWeapon('Inline Muzzleloader');
            await createObjectiveWeapon('Longbow');
            await createObjectiveWeapon('Parker Python Compound Bow');
            await createObjectiveWeapon('Recurve Bow');
            await createObjectiveWeapon('Snakebite Compound Bow');
            await createObjectiveWeapon('SxS Shotgun');
            await createObjectiveWeapon('Tenpoint Carbon Fusion Crossbow');
        });
};
