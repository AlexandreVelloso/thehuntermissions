const { getAnimalsLastMission, getLastMission } = require('../utils/animalsMissions');
const AnimalService = require('../Services/AnimalService');

module.exports = {
    async index(userId) {
        const animals = await AnimalService.index(userId);

        return getAnimalsLastMission(animals);
    },

    async get(animalId, userId) {
        const animal = await AnimalService.get(animalId, userId);

        animal.mission = getLastMission(animal.missions);
        delete animal.missions;

        return animal;
    }
}