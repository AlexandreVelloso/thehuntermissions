import AnimalModel from '../../database/models/AnimalModel';
import EntityNotFoundException from '../Exceptions/EntityNotFoundException';
import userHaveAllObjectiveWeapons from '../Utils/userHaveAllObjectiveWeapons';

class AnimalService {
    static async index(userId: any) {
        const animals = await AnimalModel.query()
            .select('animals.*')
            .withGraphFetched('missions')
            .modifyGraph('missions', (missionsBuilder) => {
                missionsBuilder.select('missions.*')
                    .withGraphFetched('objectives')
                    .modifyGraph('objectives', (objectivesBuilder) => {
                        objectivesBuilder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                            // eslint-disable-next-line func-names
                            .leftJoin('user_objectives', function () {
                                this.on('objectives.id', 'user_objectives.objective_id')
                                    .on('user_objectives.user_id', userId);
                            })
                            .withGraphFetched('weapons')
                            .modifyGraph('weapons', (weaponsBuilder) => {
                                weaponsBuilder.select('weapons.*', 'user_weapons.have_weapon')
                                    // eslint-disable-next-line func-names
                                    .leftJoin('user_weapons', function () {
                                        this.on('weapons.id', 'user_weapons.weapon_id')
                                            .on('user_weapons.user_id', userId);
                                    });
                            });
                    });
            });

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

    static async get(animalId: number, userId: any) {
        const animal = await AnimalModel.query()
            .select('animals.*')
            .withGraphFetched('missions')
            .modifyGraph('missions', (missionsBuilder) => {
                missionsBuilder.select('missions.*')
                    .withGraphFetched('objectives')
                    .modifyGraph('objectives', (objectivesBuilder) => {
                        objectivesBuilder.select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
                            // eslint-disable-next-line func-names
                            .leftJoin('user_objectives', function () {
                                this.on('objectives.id', 'user_objectives.objective_id')
                                    .on('user_objectives.user_id', userId);
                            })
                            .withGraphFetched('weapons')
                            .modifyGraph('weapons', (weaponsBuilder) => {
                                weaponsBuilder.select('weapons.*', 'user_weapons.have_weapon')
                                    // eslint-disable-next-line func-names
                                    .leftJoin('user_weapons', function () {
                                        this.on('weapons.id', 'user_weapons.weapon_id')
                                            .on('user_weapons.user_id', userId);
                                    });
                            });
                    });
            })
            .where('animals.id', animalId)
            .first();

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

export default AnimalService;
