const ObjectiveService = require('../Services/ObjectiveService');

module.exports = {
    async index(req, res, next) {
        const { user } = req.auth;

        try {
            const objectives = await ObjectiveService.index(user.id);
            return res.json(objectives);
        } catch (err) {
            next(err);
        }
    },

    async get(req, res, next) {
        const { id: objectiveId } = req.params;
        const { user } = req.auth;

        try {
            const objective = await ObjectiveService.get(objectiveId, user.id);
            return res.json(objective);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { completed } = req.body;
        const { user } = req.auth;

        try {
            await ObjectiveService.update(id, completed, user);
            return res.status(204).end();
        } catch (err) {
            next(err);
        }
    },
};
