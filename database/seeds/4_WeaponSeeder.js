
exports.seed = (knex) => knex('weapons').del()
    .then(() => knex('weapons').insert([
        { name: '12 GA Blaser F3 Game O/U Shotgun', price: 0 },
        { name: '12 GA Pump Action Shotgun', price: 0 },
        { name: '12 GA Single Shot Shotgun', price: 0 },
        { name: '16GA/9.3x74R Drilling', price: 0 },
        { name: '17 HMR Lever Action Rifle', price: 0 },
        { name: '20 GA Semi-Automatic Shotgun', price: 0 },
        { name: '22 Air Rifle', price: 0 },
        { name: '22 Pistol', price: 0 },
        { name: '22 Semi-Automatic Rifle', price: 0 },
        { name: '223 Bolt Action Rifle', price: 0 },
        { name: '223 Semi-Automatic Rifle', price: 0 },
        { name: '243 Bolt Action Rifle', price: 0 },
        { name: '270 Bolt Action Rifle', price: 0 },
        { name: '30 R O/U Break Action Rifle', price: 0 },
        { name: '30-06 Bolt Action Rifle', price: 0 },
        { name: '30-06 Lever Action Rifle', price: 0 },
        { name: '30-06 Stutzen Bolt Action Rifle', price: 0 },
        { name: '30-30 Lever Action Rifle', price: 0 },
        { name: '300 Bolt Action Rifle', price: 0 },
        { name: '303 British Bolt Action Rifle', price: 0 },
        { name: '308 "Highwayman" Handgun', price: 0 },
        { name: '308 "Rival" Handgun', price: 0 },
        { name: '308 "Wolfsbane" Handgun', price: 0 },
        { name: '308 Anschütz 1780 D FL Bolt Action Rifle', price: 0 },
        { name: '308 Bolt Action Rifle', price: 0 },
        { name: '340 Weatherby Magnum Bolt Action Rifle', price: 0 },
        { name: '357 Revolver', price: 0 },
        { name: '405 Lever Action Rifle', price: 0 },
        { name: '44 Magnum Revolver', price: 0 },
        { name: '45 Long Colt Revolver', price: 0 },
        { name: '45-70 Buffalo Rifle', price: 0 },
        { name: '45-70 Government Lever Action Rifle', price: 0 },
        { name: '454 Revolver', price: 0 },
        { name: '50 Cap Lock Muzzleloader', price: 0 },
        { name: '50 Inline Muzzleloader', price: 0 },
        { name: '50 Inline Muzzleloading Pistol', price: 0 },
        { name: '6.5x55 Blaser R8 Bolt Action Rifle', price: 0 },
        { name: '6.5x55 Bolt Action Rifle', price: 0 },
        { name: '7mm Magnum Break Action Rifle', price: 0 },
        { name: '7mm Magnum Bullpup Rifle', price: 0 },
        { name: '7x64mm Bolt Action Rifle', price: 0 },
        { name: '8x57 IS Anschütz 1780 D FL Bolt Action Rifle', price: 0 },
        { name: '8x57 IS K98k Bolt Action Rifle', price: 0 },
        { name: '9.3x62 Anschütz 1780 D FL Bolt Action Rifle', price: 0 },
        { name: '9.3x74R O/U Break Action Rifle', price: 0 },
        { name: 'Cable-backed Bow', price: 0 },
        { name: 'Crossbow Pistol', price: 0 },
        { name: 'Heavy Recurve Bow', price: 0 },
        { name: 'Inline Muzzleloader', price: 0 },
        { name: 'Longbow', price: 0 },
        { name: 'Parker Python Compound Bow', price: 0 },
        { name: 'Recurve Bow', price: 0 },
        { name: 'Snakebite Compound Bow', price: 0 },
        { name: 'SxS Shotgun', price: 0 },
        { name: 'Tenpoint Carbon Fusion Crossbow', price: 0 },
    ]));
