const Mission = require('../../database/models/Mission');
const Objective = require('../../database/models/Objective');
const UserObjective = require('../../database/models/UserObjective');

module.exports = {
    async index(req, res) {
        const { user } = req.auth;

        const mission = await Mission.query()
            .withGraphFetched('objectives')
            .modifyGraph('objectives', (builder) => {
                builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_objectives', function () {
                        this.on('objectives.id', 'user_objectives.objective_id')
                            .on('user_objectives.user_id', user.id);
                    });
            });

        return res.json(mission);
    },

    async get(req, res) {
        const { id } = req.params;
        const { user } = req.auth;

        const mission = await Mission.query()
            .withGraphFetched('objectives')
            .modifyGraph('objectives', (builder) => {
                builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_objectives', function () {
                        this.on('objectives.id', 'user_objectives.objective_id')
                            .on('user_objectives.user_id', user.id);
                    });
            })
            .where('missions.id', id)
            .first();

        if (!mission) {
            return res.status(404).json({
                error: 'Mission not found',
            });
        }

        return res.json(mission);
    },

    async update(req, res) {
        const { id } = req.params;
        const { user } = req.auth;
        const { completed } = req.body;

        const mission = await Mission.query()
            .findById(id);

        if (!mission) {
            return res.status(404)
                .json({
                    error: 'Mission not found',
                });
        }

        const objectivesIds = await Objective.query()
            .where('mission_id', mission.id)
            .then((items) => items.map((it) => it.id));

        const objectivesToPatch = await UserObjective.query()
            .where('user_id', user.id)
            .where('objective_id', 'in', objectivesIds)
            .then((items) => items.map((it) => it.objective_id));

        // eslint-disable-next-line max-len
        const objectivesToInsert = objectivesIds.filter((objectiveId) => objectivesToPatch.indexOf(objectiveId) === -1);

        if (objectivesToPatch.length > 0) {
            await UserObjective.query()
                .where('objective_id', 'in', objectivesToPatch);
        }

        if (objectivesToInsert.length > 0) {
            const arrayToInsert = objectivesToInsert.map((objectiveId) => ({
                objective_id: objectiveId,
                user_id: user.id,
                completed,
            }));

            await UserObjective.query()
                .insertGraph(arrayToInsert);
        }


        return res.status(204).end();
    },
};
