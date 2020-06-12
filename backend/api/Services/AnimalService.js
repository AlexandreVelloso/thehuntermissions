const Animal = require('../../database/models/Animal');
const EntityNotFoundException = require('../Exceptions/EntityNotFoundException');
const userHaveAllObjectiveWeapons = require('../utils/userHaveAllObjectiveWeapons');

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
            });

        for (let animalIndex = 0; animalIndex < animals.length; animalIndex += 1) {

            const missionsLength = animals[animalIndex].missions.length;
            for (let missionIndex = 0; missionIndex < missionsLength; missionIndex += 1) {

                const objectivesLength = animals[animalIndex].missions[missionIndex].objectives.length;

                for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
                    const weapons = animals[animalIndex]
                        .missions[missionIndex]
                        .objectives[objectivesIndex]
                        .weapons;

                    animals[animalIndex]
                        .missions[missionIndex]
                        .objectives[objectivesIndex]
                        .have_weapon = userHaveAllObjectiveWeapons(weapons);
                }

            }

        }

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

        const missionsLength = animal.missions.length;
        for (let missionIndex = 0; missionIndex < missionsLength; missionIndex += 1) {

            const objectivesLength = animal.missions[missionIndex].objectives.length;

            for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
                const weapons = animal.
                    missions[missionIndex]
                    .objectives[objectivesIndex]
                    .weapons;

                animal
                    .missions[missionIndex]
                    .objectives[objectivesIndex]
                    .have_weapon = userHaveAllObjectiveWeapons(weapons);
            }

        }

        return animal;
    },
}