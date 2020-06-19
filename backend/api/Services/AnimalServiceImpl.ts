import AnimalModel from '../../database/models/AnimalModel';
import EntityNotFoundException from '../Exceptions/EntityNotFoundException';
import userHaveAllObjectiveWeapons from '../Utils/userHaveAllObjectiveWeapons';
import AnimalRepository from '../Repositories/AnimalRepository';
import AnimalService from './AnimalService';

class AnimalServiceImpl implements AnimalService {

    private animalRepository: AnimalRepository;

    public constructor(animalRepository: AnimalRepository) {
        this.animalRepository = animalRepository;
    }

    async index(userId: number): Promise<AnimalModel[]> {
        const animals = await this.animalRepository
            .getAnimalsByUser(userId);

        for (let animalIndex = 0; animalIndex < animals.length; animalIndex += 1) {
            const missionsLength = animals[animalIndex].missions.length;
            for (let missionIndex = 0; missionIndex < missionsLength; missionIndex += 1) {
                const objectivesLength = animals[animalIndex]
                    .missions[missionIndex]
                    .objectives.length;

                let userHasWeapon = true;

                // eslint-disable-next-line max-len
                for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
                    const { weapons } = animals[animalIndex]
                        .missions[missionIndex]
                        .objectives[objectivesIndex];

                    const hasSomeWeapon = userHaveAllObjectiveWeapons(weapons);

                    if (!hasSomeWeapon) {
                        userHasWeapon = false;
                    }
                }

                animals[animalIndex]
                    .missions[missionIndex]
                    .user_has_weapon = userHasWeapon;
            }
        }

        return animals;
    }

    async get(animalId: number, userId: any): Promise<AnimalModel> {
        const animal = await this.animalRepository
            .findAnimalByUser(animalId, userId);

        if (!animal) {
            throw new EntityNotFoundException('Animal not found');
        }

        const missionsLength = animal.missions.length;
        for (let missionIndex = 0; missionIndex < missionsLength; missionIndex += 1) {
            const objectivesLength = animal
                .missions[missionIndex]
                .objectives.length;

            let userHasWeapon = true;

            // eslint-disable-next-line max-len
            for (let objectivesIndex = 0; objectivesIndex < objectivesLength; objectivesIndex += 1) {
                const { weapons } = animal
                    .missions[missionIndex]
                    .objectives[objectivesIndex];

                const hasSomeWeapon = userHaveAllObjectiveWeapons(weapons);

                if (!hasSomeWeapon) {
                    userHasWeapon = false;
                }
            }

            animal
                .missions[missionIndex]
                .user_has_weapon = userHasWeapon;
        }

        return animal;
    }
}

export default AnimalServiceImpl;
