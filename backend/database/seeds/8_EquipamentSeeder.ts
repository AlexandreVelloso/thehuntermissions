import Knex from 'knex';

exports.seed = (knex: Knex) => knex('equipaments').del()
    .then(() => knex('equipaments').insert([
        { name: 'Ground Blind', price: 0 },
        { name: 'Hunting Tower', price: 0 },
        { name: 'Shooting Tripod Rest', price: 0 },
        { name: 'Tree Stand', price: 0 },
        { name: 'Tripod Stand', price: 0 },
        { name: 'Waterfowl Blind', price: 0 },
    ]));
