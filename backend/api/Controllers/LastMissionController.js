const LastMissionService = require('../Services/LastMissionService');

module.exports = {
    async index(req, res, next) {
        const { user } = req.auth;

        try {
            const animals = await LastMissionService.index(user.id);
            return res.json(animals);
        } catch (err) {
            next(err);
        }
    },

    async get(req, res, next) {
        const { id: animalId } = req.params;
        const { user } = req.auth;

        try {
            const animal = await LastMissionService.get(animalId, user.id);
            return res.json(animal);
        } catch (err) {
            next(err);
        }
    },
};
