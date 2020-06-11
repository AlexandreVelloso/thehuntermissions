const Mission = require('../../database/models/Mission');
const Objective = require('../../database/models/Objective');
const UserObjective = require('../../database/models/UserObjective');
const EntityNotFoundException = require('../Exceptions/EntityNotFoundException');

module.exports = {
    async index(userId) {
        const missions = await Mission.query()
            .withGraphFetched('objectives')
            .modifyGraph('objectives', (builder) => {
                builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_objectives', function () {
                        this.on('objectives.id', 'user_objectives.objective_id')
                            .on('user_objectives.user_id', userId);
                    });
            });

        return missions;
    },

    async get(missionId, userId) {
        const mission = await Mission.query()
            .withGraphFetched('objectives')
            .modifyGraph('objectives', (builder) => {
                builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_objectives', function () {
                        this.on('objectives.id', 'user_objectives.objective_id')
                            .on('user_objectives.user_id', userId);
                    });
            })
            .where('missions.id', missionId)
            .first();

        if (!mission) {
            throw new EntityNotFoundException('Mission not found');
        }

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