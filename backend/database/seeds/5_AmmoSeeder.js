exports.seed = (knex) => knex('ammos').del()
    .then(() => knex('ammos').insert([
        { name: '.17 HMR Ammunition' },
        { name: '.17 HMR HV Ammunition' },
        { name: '.22 Air Rifle Pellet' },
        { name: '.22 LR Ammunition' },
        { name: '.223 Nosler Ballistic Tip' },
        { name: '.243 Nosler Ballistic Tip' },
        { name: '.270 Nosler Ballistic Tip' },
        { name: '.30 R Ammunition' },
        { name: '.30-06 Nosler Partition' },
        { name: '.30-06 Round Nose Ammunition' },
        { name: '.30-30 Nosler Partition' },
        { name: '.300 Nosler AccuBond' },
        { name: '.303 British Ammunition' },
        { name: '.308 Nosler Partition' },
        { name: '.340 Weatherby Magnum Ammunition' },
        { name: '.357 Nosler Sporting Handgun' },
        { name: '.405 Ammunition' },
        { name: '.44 Nosler Sporting Handgun' },
        { name: '.45 Copper Bullet' },
        { name: '.45 Long Colt Handgun' },
        { name: '.45 Saboted Bullet' },
        { name: '.45-70 Government' },
        { name: '.454 Revolver Handgun' },
        { name: '.50 Conical Bullet' },
        { name: '.50 Lead Bullet' },
        { name: '.50 Patched Round Ball' },
        { name: '10 GA Birdshot Shells' },
        { name: '10 GA Buckshot Shells' },
        { name: '10 GA Slug Shells' },
        { name: '10mm Auto Ammunition' },
        { name: '12 GA Shells (Birdshot)' },
        { name: '12 GA Shells (Buckshot)' },
        { name: '12 GA Shells (Slug)' },
        { name: '16 GA Birdshot Shells' },
        { name: '16 GA Buckshot Shells' },
        { name: '16 GA Slug Shells' },
        { name: '20 GA Birdshot Shells' },
        { name: '6.5x55 Nosler AccuBond' },
        { name: '7.62x54R SP Ammunition' },
        { name: '7mm Magnum' },
        { name: '7mm-08 Ammunition (HP)' },
        { name: '7mm-08 Ammunition (HV)' },
        { name: '7x64mm Ammunition' },
        { name: '8x57 IS Nosler Partition' },
        { name: '9.3x62 Nosler Partition' },
        { name: '.9.3x74R Ammunition' },
        { name: 'Cable-backed Bow Arrows' },
        { name: 'Compound Arrows (Red Tracer Flare)' },
        { name: 'Compound Arrows (Standard Broadhead)' },
        { name: 'Crossbow Arrows (Blue Tracer Flare)' },
        { name: 'Crossbow Arrows' },
        { name: 'Crossbow Bolts' },
        { name: 'Cupid Arrows (Red Tracer Flare)' },
        { name: 'Longbow Arrows' },
        { name: 'Recurve Arrows (Orange Tracer Flare)' },
        { name: 'Recurve Arrows (Standard Broadhead)' },
    ]));