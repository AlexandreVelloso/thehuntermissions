import AnimalRepository from '../AnimalRepository';
import AnimalModel from '../../../database/models/AnimalModel';

class AnimalRepositoryImpl implements AnimalRepository {

    async findById(animalId: number): Promise<AnimalModel> {
        return await AnimalModel.query()
            .where('id', animalId)
            .first();
    }

    async findAnimalByUser(animalId: number, userId: any): Promise<AnimalModel> {
        return await AnimalModel.query()
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
    }

    async getAnimalsByUser(userId: any): Promise<AnimalModel[]> {
        return await AnimalModel.query()
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
    }

}

export default AnimalRepositoryImpl;