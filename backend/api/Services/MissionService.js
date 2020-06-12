const Mission = require('../../database/models/Mission');
const Objective = require('../../database/models/Objective');
const UserObjective = require('../../database/models/UserObjective');
const EntityNotFoundException = require('../Exceptions/EntityNotFoundException');
const userHaveAllObjectiveWeapons = require('../utils/userHaveAllObjectiveWeapons');

module.exports = {
    async index(userId) {
        const missions = await Mission.query()
            .select('missions.*')
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

        for (let missionIndex = 0; missionIndex < missions.length; missionIndex += 1) {

            const objectivesLength = missions[missionIndex].objectives.length;
            let user_has_weapon = true;

            for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
                const weapons = missions[missionIndex]
                    .objectives[objectivesIndex]
                    .weapons;

                const has_some_weapon = userHaveAllObjectiveWeapons(weapons);

                if (!has_some_weapon) {
                    user_has_weapon = false;
                }
            }

            missions[missionIndex].user_has_weapon = user_has_weapon;
        }

        return missions;
    },

    async get(missionId, userId) {
        const mission = await Mission.query()
            .select('missions.*')
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
            .where('missions.id', missionId)
            .first();

        if (!mission) {
            throw new EntityNotFoundException('Mission not found');
        }

        const objectivesLength = mission.objectives.length;
        let user_has_weapon = true;

        for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
            const weapons = mission
                .objectives[objectivesIndex]
                .weapons;

            const has_some_weapon = userHaveAllObjectiveWeapons(weapons);

            if (!has_some_weapon) {
                user_has_weapon = false;
            }
        }

        mission.user_has_weapon = user_has_weapon;

        return mission;
    },

    async update(missionId, missionCompleted, userId) {
        const mission = await Mission.query()
            .findById(missionId);

        if (!mission) {
            throw new EntityNotFoundException('Mission not found');
        }

        const objectivesIds = await Objective.query()
            .where('mission_id', mission.id)
            .then((items) => items.map((item) => item.id));

        const objectivesToPatch = await UserObjective.query()
            .where('user_id', userId)
            .where('objective_id', 'in', objectivesIds)
            .then((items) => items.map((item) => item.objective_id));

        // eslint-disable-next-line max-len
        const objectivesToInsert = objectivesIds.filter((objectiveId) => objectivesToPatch.indexOf(objectiveId) === -1);

        if (objectivesToPatch.length > 0) {
            await UserObjective.query()
                .where('objective_id', 'in', objectivesToPatch)
                .update({ completed: missionCompleted });
        }

        if (objectivesToInsert.length > 0) {
            const arrayToInsert = objectivesToInsert.map((objectiveId) => ({
                objective_id: objectiveId,
                user_id: userId,
                completed: missionCompleted,
            }));

            await UserObjective.query()
                .insertGraph(arrayToInsert);
        }
    }
}