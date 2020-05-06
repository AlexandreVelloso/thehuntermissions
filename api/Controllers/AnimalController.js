const Animal = require('../../database/models/Animal');

module.exports = {
    async index(req, res) {
        const { user } = req.auth;

        const animals = await Animal.query()
            .withGraphFetched('missions.objectives')
            .modifyGraph('missions.objectives', (builder) => {
                builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed', 'weapons.id as weapon_id', 'user_weapons.have_weapon')
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
            });

        return res.json(animals);
    },

    async get(req, res) {
        const { id } = req.params;
        const { user } = req.auth;

        const animal = await Animal.query()
            .withGraphFetched('missions.objectives')
            .modifyGraph('missions.objectives', (builder) => {
                builder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed', 'weapons.id as weapon_id', 'user_weapons.have_weapon')
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
