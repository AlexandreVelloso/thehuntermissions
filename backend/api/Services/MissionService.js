const Mission = require('../../database/models/Mission');
const Objective = require('../../database/models/Objective');
const UserObjective = require('../../database/models/UserObjective');
const EntityNotFoundException = require('../Exceptions/EntityNotFoundException');
const ObjectiveService = require('../Services/ObjectiveService');

module.exports = {
    async index(userId) {
        const missions = await Mission.query();

        for(let index = 0; index < missions.length; index +=1){
            const missionId = missions[index].id;

            const objectives = await ObjectiveService.getObjectivesByMissionId(missionId, userId);

            missions[index].objectives = objectives;
        }

        return missions;
    },

    async get(missionId, userId) {
        const mission = await Mission.query()
            .where('id', missionId)
            .first();

        if (!mission) {
            throw new EntityNotFoundException('Mission not found');
        }

        const objectives = await ObjectiveService.getObjectivesByMissionId(missionId, userId);

        mission.objectives = objectives;

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