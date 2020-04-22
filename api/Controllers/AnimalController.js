const Animal = require('../../database/models/Animal');

module.exports = {
    async index(req, res) {
        const { user } = req.auth;

        const animals = await Animal.query()
            .withGraphFetched('missions.objectives')
            .modifyGraph('missions.objectives', (builder) => {
                builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_objectives', function () {
                        this.on('objectives.id', 'user_objectives.objective_id')
                            .on('user_objectives.user_id', user.id);
                    });
            });

        return res.json(animals);
    },

    async get(req, res) {
        const { id } = req.params;
        const { user } = req.auth;

        const animal = await Animal.query()
            .withGraphFetched('missions.objectives')
            .modifyGraph('missions.objectives', (builder) => {
                builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_objectives', function () {
                        this.on('objectives.id', 'user_objectives.objective_id')
                            .on('user_objectives.user_id', user.id);
                    });
            })
            .where('animals.id', id)
            .first();

        if (!animal) {
            return res.status(404)
                .json({
                    error: 'Animal not found',
                });
        }

        return res.json(animal);
    },
};
