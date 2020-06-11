const AnimalService = require('../Services/AnimalService');

module.exports = {
    async index(req, res, next) {
        const { user } = req.auth;

        try {
            const animals = await AnimalService.index(user.id);
            return res.json(animals);
        } catch (err) {
            next(err);
        }
    },

    async get(req, res, next) {
        const { id: animalId } = req.params;
        const { user } = req.auth;

        try {
            const animal = await AnimalService.get(animalId, user.id);
            return res.json(animal);
        } catch (err) {
            next(err);
        }
    },
};
