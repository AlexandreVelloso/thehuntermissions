const Objective = require('../../database/models/Objective');
const UserObjective = require('../../database/models/UserObjective');

module.exports = {
    async index(req, res) {
        const { user } = req.auth;

        const objectives = await Objective.query()
            .select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
            // eslint-disable-next-line func-names
            .leftJoin('user_objectives', function () {
                this.on('objectives.id', 'user_objectives.objective_id')
                    .on('user_objectives.user_id', user.id);
            });

        return res.json(objectives);
    },

    async get(req, res) {
        const { id } = req.params;
        const { user } = req.auth;

        const objective = await Objective.query()
            .select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
            // eslint-disable-next-line func-names
            .leftJoin('user_objectives', function () {
                this.on('objectives.id', 'user_objectives.objective_id')
                    .on('user_objectives.user_id', user.id);
            })
            .where('objectives.id', id)
            .first();

        if (!objective) {
            return res.status(404)
                .json({
                    error: 'Objective not found',
                });
        }

        return res.json(objective);
    },

    async update(req, res) {
        const { id } = req.params;
        const { completed } = req.body;
        const { user } = req.auth;

        const objective = await Objective.query()
            .where('id', id)
            .first();

        if (!objective) {
            return res.status(404)
                .json({
                    error: 'Objective not found',
                });
        }

        const userObjective = await UserObjective.query()
            .where('objective_id', id)
            .where('user_id', user.id)
            .first();

        if (userObjective) {
            await UserObjective.query()
                .where('objective_id', id)
                .where('user_id', user.id)
                .patch({
                    completed,
                });
        } else {
            await UserObjective.query()
                .insert({
                    objective_id: objective.id,
                    user_id: user.id,
                    completed,
                });
        }

        return res.status(204).end();
    },
};
