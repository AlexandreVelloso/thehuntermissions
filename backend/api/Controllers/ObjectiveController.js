const Objective = require('../../database/models/Objective');
const UserObjective = require('../../database/models/UserObjective');
const { removeObjectivesDuplicates } = require('../utils/removeObjectivesDuplicates');

module.exports = {
    async index(req, res) {
        const { user } = req.auth;

        let objectives = await Objective.query()
            .select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed', 'weapons.id as weapon_id', 'user_weapons.have_weapon')
            // eslint-disable-next-line func-names
            .leftJoin('user_objectives', function () {
                this.on('objectives.id', 'user_objectives.objective_id')
                    .on('user_objectives.user_id', user.id);
            })
            // eslint-disable-next-line func-names
            .leftJoin('objectives_weapons', 'objectives_weapons.objective_id', 'objectives.id')
            .leftJoin('weapons', 'weapons.id', 'objectives_weapons.weapon_id')
            // eslint-disable-next-line func-names
            .leftJoin('user_weapons', function () {
                this.on('user_weapons.weapon_id', 'weapons.id')
                    .on('user_weapons.user_id', user.id);
            });

        objectives = removeObjectivesDuplicates(objectives);

        return res.json(objectives);
    },

    async get(req, res) {
        const { id } = req.params;
        const { user } = req.auth;

        const objective = await Objective.query()
            .select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed', 'weapons.id as weapon_id', 'user_weapons.have_weapon')
            // eslint-disable-next-line func-names
            .leftJoin('user_objectives', function () {
                this.on('objectives.id', 'user_objectives.objective_id')
                    .on('user_objectives.user_id', user.id);
            })
            // eslint-disable-next-line func-names
            .leftJoin('objectives_weapons', 'objectives_weapons.objective_id', 'objectives.id')
            .leftJoin('weapons', 'weapons.id', 'objectives_weapons.weapon_id')
            // eslint-disable-next-line func-names
            .leftJoin('user_weapons', function () {
                this.on('user_weapons.weapon_id', 'weapons.id')
                    .on('user_weapons.user_id', user.id);
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
