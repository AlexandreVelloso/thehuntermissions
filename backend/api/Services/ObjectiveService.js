const Objective = require('../../database/models/Objective');
const UserObjective = require('../../database/models/UserObjective');
const EntityNotFoundException = require('../Exceptions/EntityNotFoundException');
const userHaveAllObjectiveWeapons = require('../utils/userHaveAllObjectiveWeapons');

module.exports = {
    async index(userId) {
        const objectives = await Objective.query()
            .select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
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
            });

        for (let index = 0; index < objectives.length; index++) {
            const weapons = objectives[index].weapons;
            objectives[index].have_weapon = userHaveAllObjectiveWeapons(weapons);
        }

        return objectives;
    },

    async get(objectiveId, userId) {
        const objective = await Objective.query()
            .select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
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
            .where('objectives.id', objectiveId)
            .first();

        if (!objective) {
            throw new EntityNotFoundException('Objective not found');
        }

        objective.have_weapon = userHaveAllObjectiveWeapons(objective.weapons);

        return objective;
    },

    async update(objectiveId, objectiveCompleted, userId) {
        const objective = await Objective.query()
            .where('id', objectiveId)
            .first();

        if (!objective) {
            throw new EntityNotFoundException('Objective not found');
        }

        const userObjective = await UserObjective.query()
            .where('objective_id', objectiveId)
            .where('user_id', userId)
            .first();

        if (userObjective) {
            await UserObjective.query()
                .where('objective_id', objectiveId)
                .where('user_id', userId)
                .patch({
                    completed: objectiveCompleted,
                });
        } else {
            await UserObjective.query()
                .insert({
                    objective_id: objective.id,
                    user_id: userId,
                    completed: objectiveCompleted,
                });
        }
    }
}