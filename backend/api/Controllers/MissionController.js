const MissionService = require('../Services/MissionService');

module.exports = {
    async index(req, res, next) {
        const { user } = req.auth;

        try{
            const missions = await MissionService.index(user.id);
            return res.json(missions);
        }catch(err){
            next(err);
        }
    },

    async get(req, res, next) {
        const { id: missionId } = req.params;
        const { user } = req.auth;

        try{
            const mission = await MissionService.get(missionId, user.id);
            return res.json(mission);
        }catch(err){
            next(err);
        }
    },

    async update(req, res, next) {
        const { id: missionId } = req.params;
        const { user } = req.auth;
        const { completed } = req.body;

        try{
            await MissionService.update(missionId, completed, user.id);
            return res.status(204).end();
        }catch(err){
            next(err);
        }
    },
};
