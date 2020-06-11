const Objective = require('../../database/models/Objective');
const Weapon = require('../../database/models/Weapon');
const EntityNotFoundException = require('../Exceptions/EntityNotFoundException');

const userHaveObjectiveWeapon = async (objectiveId, userId) => {
    const weapons = await Weapon.query()
        .select('user_weapons.have_weapon')
        .join('objectives_weapons', 'objectives_weapons.weapon_id', 'weapons.id')
        // eslint-disable-next-line func-names
        .leftJoin('user_weapons', function () {
            this.on('user_weapons.weapon_id', 'weapons.id')
                .on('user_weapons.user_id', userId);
        })
        .where('objectives_weapons.objective_id', objectiveId);

    const haveWeapon = weapons.length === 0 || weapons.some((weapon) => weapon.have_weapon);

    return haveWeapon;
}

module.exports = {
    async index(userId) {
        const objectives = await Objective.query()
            .select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
            // eslint-disable-next-line func-names
            .leftJoin('user_objectives', function () {
                this.on('objectives.id', 'user_objectives.objective_id')
                    .on('user_objectives.user_id', userId);
            });

        for (let index = 0; index < objectives.length; index++) {
            const objectiveId = objectives[index].id;
            objectives[index].have_weapon = await userHaveObjectiveWeapon(objectiveId, userId);
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
            .where('objectives.id', objectiveId)
            .first();

        if (!objective) {
            throw new EntityNotFoundException('Objective not found');
        }

        objective.have_weapon = await userHaveObjectiveWeapon(objectiveId, userId);

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