const Animal = require('../../database/models/Animal');
const EntityNotFoundException = require('../Exceptions/EntityNotFoundException');
const MissionService = require('../Services/MissionService');

module.exports = {
    async index(userId) {
        const animals = await Animal.query();

        for(let index = 0; index < animals.length; index += 1){
            const animalId = animals[index].id;

            animals[index].missions = await MissionService.getMissionsByAnimal(animalId, userId);
        }

        return animals;
    },

    async get(animalId, userId) {
        const animal = await Animal.query()
            .where('id', animalId)
            .first();

        if (!animal) {
            throw new EntityNotFoundException('Animal not found');
        }

        animal.missions = await MissionService.getMissionsByAnimal(animal.id, userId);

        return animal;
    },
}