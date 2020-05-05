const { Model } = require('objection');

const Weapon = require('../models/Weapon');
const Ammo = require('../models/Ammo');
const WeaponAmmo = require('../models/WeaponAmmo');

async function findAmmoByName(name) {
    return Ammo.query()
        .where('name', name)
        .first();
}

async function getWeaponsByName(weapons) {
    return Weapon.query()
        .where('name', 'in', weapons);
}

async function insertData(knex, ammoName, weaponsArray) {
    const ammo = await findAmmoByName(ammoName);

    const weapons = await getWeaponsByName(weaponsArray);

    const weaponsAmmos = weapons.map((weapon) => ({
        ammo_id: ammo.id,
        weapon_id: weapon.id,
    }));

    if (process.env.NODE_ENV === 'production') {
        await knex('weapons_ammos')
            .insert(weaponsAmmos);
    } else {
        await WeaponAmmo.query()
            .insertGraph(weaponsAmmos);
    }
}

async function cableBackedBowArrows(knex) {
    insertData(knex,
        'Cable-backed Bow Arrows',
        [
            'Cable-backed Bow',
        ]);
}

async function compoundArrowsRedTracerFlare(knex) {
    insertData(knex,
        'Compound Arrows (Red Tracer Flare)',
        [
            'Compound Bow "Snakebite"',
            'Compound Bow "Parker Python"',
            'Compound Bow Red Dragon',
            'Compound Bow Pulsar',
            '',
        ]);
}

async function compoundArrowsStandardBroadhead(knex) {
    await insertData(knex,
        'Compound Arrows (Standard Broadhead)',
        [
            'Compound Bow "Snakebite"',
            'Compound Bow "Parker Python"',
            'Compound Bow Red Dragon',
            'Compound Bow Pulsar',
        ]);
}

async function crossbowArrows(knex) {
    insertData(knex,
        'Crossbow Arrows',
        [
            'Tenpoint Carbon Fusion Crossbow',
            'Reverse Draw Crossbow',
        ]);
}

async function crossbowArrowsBlueTracerFlare(knex) {
    insertData(knex,
        'Crossbow Arrows (Blue Tracer Flare)',
        [
            'Tenpoint Carbon Fusion Crossbow',
            'Reverse Draw Crossbow',
        ]);
}

async function crossbowBolts(knex) {
    insertData(knex,
        'Crossbow Bolts',
        [
            'Crossbow Pistol',
            'Crossbow Pistol Wolfsbane',
        ]);
}

async function cupidArrowsRedTracerFlare(knex) {
    await insertData(knex,
        'Cupid Arrows (Red Tracer Flare)',
        [
            'Compound Bow "Snakebite"',
            'Compound Bow Red Dragon',
            'Compound Bow "Parker Python"',
            'Recurve Bow Modern',
            'Recurve Bow Carbon',
        ]);
}

async function dot10GABirdshotShells(knex) {
    await insertData(knex,
        '10 GA Birdshot Shells',
        [
            '10 GA Lever Action Shotgun',
        ]);
}

async function dot10GABuckshotShells(knex) {
    await insertData(knex,
        '10 GA Buckshot Shells',
        [
            '10 GA Lever Action Shotgun',
        ]);
}

async function dot10GASlugShells(knex) {
    await insertData(knex,
        '10 GA Slug Shells',
        [
            '10 GA Lever Action Shotgun',
        ]);
}

async function dot12GAShellsBirdshot(knex) {
    await insertData(knex,
        '12 GA Shells (Birdshot)',
        [
            '12 GA Pump Action Shotgun',
            '12 GA Side by Side Shotgun',
            '12 GA Blaser F3 Game O/U Shotgun',
            '12 GA Single Shot Shotgun',
        ]);
}

async function dot12GAShellsBuckshot(knex) {
    await insertData(knex,
        '12 GA Shells (Buckshot)',
        [
            '12 GA Pump Action Shotgun',
            '12 GA Side by Side Shotgun',
            '12 GA Blaser F3 Game O/U Shotgun',
            '12 GA Single Shot Shotgun',
        ]);
}

async function dot12GAShellsSlug(knex) {
    await insertData(knex,
        '12 GA Shells (Slug)',
        [
            '12 GA Pump Action Shotgun',
            '12 GA Side by Side Shotgun',
            '12 GA Blaser F3 Game O/U Shotgun',
            '12 GA Single Shot Shotgun',
        ]);
}

async function dot16GABirdshotShells(knex) {
    insertData(knex,
        '16 GA Birdshot Shells',
        [
            '16 GA Side By Side Shotgun',
            '16GA/9.3x74R Drilling',
            '16GA/9.3x74R Drilling (Engraved)',
        ]);
}

async function dot16GABuckshotShells(knex) {
    insertData(knex,
        '16 GA Buckshot Shells',
        [
            '16 GA Side By Side Shotgun',
            '16GA/9.3x74R Drilling',
            '16GA/9.3x74R Drilling (Engraved)',
        ]);
}

async function dot16GASlugShells(knex) {
    insertData(knex,
        '16 GA Slug Shells',
        [
            '16GA/9.3x74R Drilling',
        ]);
}

async function dot17HMR(knex) {
    await insertData(knex,
        '.17 HMR Ammunition',
        ['17 HMR Lever Action Rifle']);
}

async function dot17HMRHV(knex) {
    await insertData(knex,
        '.17 HMR HV Ammunition',
        ['17 HMR Lever Action Rifle']);
}

async function dot20GABirdshotShells(knex) {
    await insertData(knex,
        '20 GA Birdshot Shells',
        [
            '20 GA Semi-Automatic Shotgun',
        ]);
}

async function dot223NoslerBallisticTip(knex) {
    await insertData(knex,
        '.223 Nosler Ballistic Tip',
        [
            '.223 Bolt Action Rifle',
            '.223 Semi-Automatic Rifle',
        ]);
}

async function dot22AirRiflePellet(knex) {
    await insertData(knex,
        '.22 Air Rifle Pellet',
        ['22 Air Rifle']);
}

async function dot22LR(knex) {
    await insertData(knex,
        '.22 LR Ammunition',
        [
            '22 Semi-Automatic Rifle',
            '22 Pistol',
        ]);
}

async function dot243NoslerBallisticTip(knex) {
    await insertData(knex,
        '.243 Nosler Ballistic Tip',
        ['243 Bolt Action Rifle']);
}

async function dot300NoslerAccuBond(knex) {
    await insertData(knex,
        '.300 Nosler AccuBond',
        ['.300 Bolt Action Rifle']);
}

async function dot303BritishAmmunition(knex) {
    await insertData(knex,
        '.303 British Ammunition',
        [
            '303 British Bolt Action Rifle',
        ]);
}

async function dot308NoslerPartition(knex) {
    await insertData(knex,
        '.308 Nosler Partition',
        [
            '.308 Anschütz 1780 D FL Bolt Action Rifle',
            '308 Bolt Action Rifle',
            '308 "Rival" Handgun',
            '308 "Highwayman" Handgun',
            '308 "Wolfsbane" Handgun',
        ]);
}

async function dot30Minus06NoslerPartition(knex) {
    await insertData(knex,
        '.30-06 Nosler Partition',
        [
            '30-06 Bolt Action Rifle',
            '30-06 Stutzen Bolt Action Rifle',
        ]);
}

async function dot30Minus06RoundNoseAmmunition(knex) {
    await insertData(knex,
        '.30-06 Round Nose Ammunition',
        [
            '.30-06 Lever Action Rifle',
        ]);
}

async function dot30Minus30NoslerPartition(knex) {
    await insertData(knex,
        '.30-30 Nosler Partition',
        [
            '.30-30 Lever Action Rifle',
        ]);
}

async function dot30RAmmunition(knex) {
    await insertData(knex,
        '.30 R Ammunition',
        [
            '30 R O/U Break Action Rifle',
        ]);
}

async function dot340WeatherbyMagnumAmmunition(knex) {
    await insertData(knex,
        '.340 Weatherby Magnum Ammunition',
        ['340 Weatherby Magnum Bolt Action Rifle']);
}

async function dot357NoslerSportingHandgun(knex) {
    await insertData(knex,
        '.357 Nosler Sporting Handgun',
        [
            '357 Revolver',
        ]);
}

async function dot405Ammunition(knex) {
    await insertData(knex,
        '.405 Ammunition',
        [
            '405 Lever Action Rifle',
        ]);
}

async function dot44NoslerSportingHandgun(knex) {
    await insertData(knex,
        '.44 Nosler Sporting Handgun',
        [
            '44 Magnum Revolver',
        ]);
}

async function dot454RevolverHandgun(knex) {
    await insertData(knex,
        '.454 Revolver Handgun',
        [
            '.454 Revolver El Toro',
            '.454 Revolver El Bisonte',
        ]);
}

async function dot45CopperBullet(knex) {
    await insertData(knex,
        '.45 Copper Bullet',
        [
            '50 Inline Muzzleloading Pistol',
        ]);
}

async function dot45LongColtHandgun(knex) {
    await insertData(knex,
        '.45 Long Colt Handgun',
        [
            '45 Long Colt Revolver',
        ]);
}

async function dot45Minus70Government(knex) {
    await insertData(knex,
        '.45-70 Government',
        [
            '45-70 Government Lever Action Rifle',
            '45-70 Buffalo Rifle',
        ]);
}

async function dot45SabotedBullet(knex) {
    await insertData(knex,
        '.45 Saboted Bullet',
        [
            '50 Inline Muzzleloader',
        ]);
}

async function dot50ConicalBullet(knex) {
    await insertData(knex,
        '.50 Conical Bullet',
        [
            '50 Inline Muzzleloader',
        ]);
}

async function dot50LeadBullet(knex) {
    await insertData(knex,
        '.50 Lead Bullet',
        [
            '50 Inline Muzzleloading Pistol',
        ]);
}

async function dot50PatchedRoundBall(knex) {
    await insertData(knex,
        '.50 Patched Round Ball',
        [
            '50 Cap Lock Muzzleloader',
        ]);
}

async function dot6dot5x55NoslerAccuBond(knex) {
    await insertData(knex,
        '6.5x55 Nosler AccuBond',
        [
            '6.5x55 Blaser R8 Bolt Action Rifle',
            '6.5x55 Bolt Action Rifle',
        ]);
}

async function dot7dot62x54RSPAmmunition(knex) {
    await insertData(knex,
        '7.62x54R SP Ammunition',
        [
            '7.62x54R Bolt Action Rifle',
        ]);
}

async function dot7mmMagnum(knex) {
    await insertData(knex,
        '7mm Magnum',
        [
            '7mm Magnum Bullpup Rifle',
            '7mm Magnum Break Action Rifle',
        ]);
}

async function dot7mmMinus08AmmunitionHP(knex) {
    await insertData(knex,
        '7mm-08 Ammunition (HP)',
        [
            '7mm-08 Scout Bolt Action Rifle',
        ]);
}

async function dot7mmMinus08AmmunitionHV(knex) {
    await insertData(knex,
        '7mm-08 Ammunition (HV)',
        [
            '7mm-08 Scout Bolt Action Rifle',
        ]);
}

async function dot7x64mmAmmunition(knex) {
    await insertData(knex,
        '7x64mm Ammunition',
        [
            '7x64mm Bolt Action Rifle',
        ]);
}

async function dot8x57ISNoslerPartition(knex) {
    await insertData(knex,
        '8x57 IS Nosler Partition',
        [
            '8x57 IS Anschütz 1780 D FL Bolt Action Rifle',
            '8x57 IS K98k Bolt Action Rifle',
        ]);
}

async function dot9dot3x62NoslerPartition(knex) {
    await insertData(knex,
        '9.3x62 Nosler Partition',
        [
            '9.3x62 Anschütz 1780 D FL Bolt Action Rifle',
        ]);
}

async function dot9dot3x74RAmmunition(knex) {
    await insertData(knex,
        '.9.3x74R Ammunition',
        [
            '9.3x74R O/U Break Action Rifle',
            '16GA/9.3x74R Drilling',
        ]);
}

async function longbowArrows(knex) {
    insertData(knex,
        'Longbow Arrows',
        [
            'Longbow',
        ]);
}

async function recurveArrowsStandardBroadhead(knex) {
    insertData(knex,
        'Recurve Arrows (Standard Broadhead)',
        [
            'Recurve Bow Modern',
            'Recurve Bow Carbon',
            'Heavy Recurve Bow',
        ]);
}

async function recurveArrowsOrangeTracerFlare(knex) {
    insertData(knex,
        'Recurve Arrows (Orange Tracer Flare)',
        [
            'Recurve Bow Modern',
            'Recurve Bow Carbon',
            'Heavy Recurve Bow',
        ]);
}


async function silver308Bullets(knex) {
    await insertData(knex,
        'Silver .308 Bullets',
        ['.308 "Wolfsbane" Handgun']);
}


async function silverCrossbowBolts(knex) {
    insertData(knex,
        'Silver Crossbow Bolts',
        [
            'Crossbow Pistol Wolfsbane',
        ]);
}

exports.seed = (knex) => {
    Model.knex(knex);

    return knex('weapons_ammos').del()
        .then(async () => {
            await cableBackedBowArrows(knex);
            await compoundArrowsRedTracerFlare(knex);
            await compoundArrowsStandardBroadhead(knex);
            await crossbowArrows(knex);
            await crossbowArrowsBlueTracerFlare(knex);
            await crossbowBolts(knex);
            await cupidArrowsRedTracerFlare(knex);
            await dot10GABirdshotShells(knex);
            await dot10GABuckshotShells(knex);
            await dot10GASlugShells(knex);
            await dot12GAShellsBirdshot(knex);
            await dot12GAShellsBuckshot(knex);
            await dot12GAShellsSlug(knex);
            await dot16GABirdshotShells(knex);
            await dot16GABuckshotShells(knex);
            await dot16GASlugShells(knex);
            await dot17HMR(knex);
            await dot17HMRHV(knex);
            await dot20GABirdshotShells(knex);
            await dot223NoslerBallisticTip(knex);
            await dot22AirRiflePellet(knex);
            await dot22LR(knex);
            await dot243NoslerBallisticTip(knex);
            await dot300NoslerAccuBond(knex);
            await dot303BritishAmmunition(knex);
            await dot308NoslerPartition(knex);
            await dot30Minus06NoslerPartition(knex);
            await dot30Minus06RoundNoseAmmunition(knex);
            await dot30Minus30NoslerPartition(knex);
            await dot30RAmmunition(knex);
            await dot340WeatherbyMagnumAmmunition(knex);
            await dot357NoslerSportingHandgun(knex);
            await dot405Ammunition(knex);
            await dot44NoslerSportingHandgun(knex);
            await dot454RevolverHandgun(knex);
            await dot45CopperBullet(knex);
            await dot45LongColtHandgun(knex);
            await dot45Minus70Government(knex);
            await dot45SabotedBullet(knex);
            await dot50ConicalBullet(knex);
            await dot50LeadBullet(knex);
            await dot50PatchedRoundBall(knex);
            await dot6dot5x55NoslerAccuBond(knex);
            await dot7dot62x54RSPAmmunition(knex);
            await dot7mmMagnum(knex);
            await dot7mmMinus08AmmunitionHP(knex);
            await dot7mmMinus08AmmunitionHV(knex);
            await dot7x64mmAmmunition(knex);
            await dot8x57ISNoslerPartition(knex);
            await dot9dot3x62NoslerPartition(knex);
            await dot9dot3x74RAmmunition(knex);
            await longbowArrows(knex);
            await recurveArrowsOrangeTracerFlare(knex);
            await recurveArrowsStandardBroadhead(knex);
            await silver308Bullets(knex);
            await silverCrossbowBolts(knex);
        });
};
