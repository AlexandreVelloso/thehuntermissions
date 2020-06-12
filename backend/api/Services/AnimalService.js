const Animal = require('../../database/models/Animal');
const EntityNotFoundException = require('../Exceptions/EntityNotFoundException');

module.exports = {
    async index(userId) {
        const animals = await Animal.query()
            .select('animals.*')
            .withGraphFetched('missions')
            .modifyGraph('missions', (builder) => {
                builder.select('missions.*')
                    .withGraphFetched('objectives')
                    .modifyGraph('objectives', (builder) => {
                        builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                            // eslint-disable-next-line func-names
                            .leftJoin('user_objectives', function () {
                                this.on('objectives.id', 'user_objectives.objective_id')
                                    .on('user_objectives.user_id', userId);
                            })
                            .withGraphFetched('weapons')
                            .modifyGraph('weapons', (builder) => {
                                builder.select('weapons.*', 'user_weapons.have_weapon')
                                    // eslint-disable-next-line func-names
                                    .leftJoin('user_weapons', function () {
                                        this.on('weapons.id', 'user_weapons.weapon_id')
                                            .on('user_weapons.user_id', userId);
                                    });
                            })
                    })
            })

        return animals;
    },

    async get(animalId, userId) {
        const animal = await Animal.query()
            .select('animals.*')
            .withGraphFetched('missions')
            .modifyGraph('missions', (builder) => {
                builder.select('missions.*')
                    .withGraphFetched('objectives')
                    .modifyGraph('objectives', (builder) => {
                        builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                            // eslint-disable-next-line func-names
                            .leftJoin('user_objectives', function () {
                                this.on('objectives.id', 'user_objectives.objective_id')
                                    .on('user_objectives.user_id', userId);
                            })
                            .withGraphFetched('weapons')
                            .modifyGraph('weapons', (builder) => {
                                builder.select('weapons.*', 'user_weapons.have_weapon')
                                    // eslint-disable-next-line func-names
                                    .leftJoin('user_weapons', function () {
                                        this.on('weapons.id', 'user_weapons.weapon_id')
                                            .on('user_weapons.user_id', userId);
                                    });
                            })
                    })
            })
            .where('animals.id', animalId)
            .first();

        if (!animal) {
            throw new EntityNotFoundException('Animal not found');
        }

        return animal;
    },
}