import ObjectiveRepository from "./ObjectiveRepository";
import ObjectiveModel from "../../database/models/ObjectiveModel";

class ObjectiveRepositoryImpl implements ObjectiveRepository {

    async findById(objectiveId: number): Promise<ObjectiveModel> {
        return await ObjectiveModel.query()
            .where('id', objectiveId)
            .first();
    }

    async getObjectivesByUser(userId: any): Promise<ObjectiveModel[]> {
        return await ObjectiveModel.query()
            .select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
            // eslint-disable-next-line func-names
            .leftJoin('user_objectives', function () {
                this.on('objectives.id', 'user_objectives.objective_id')
                    .on('user_objectives.user_id', userId);
            })
            .withGraphFetched('weapons')
            .modifyGraph('weapons', (builder) => {
                builder.select('weapons.*', 'user_weapons.have_weapon')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_weapons', function () {
                        this.on('weapons.id', 'user_weapons.weapon_id')
                            .on('user_weapons.user_id', userId);
                    });
            });
    }

    async findObjectiveByUser(objectiveId: any, userId: any): Promise<ObjectiveModel> {
        return await await ObjectiveModel.query()
            .select('objectives.*', 'user_objectives.user_id', 'user_objectives.completed')
            // eslint-disable-next-line func-names
            .leftJoin('user_objectives', function () {
                this.on('objectives.id', 'user_objectives.objective_id')
                    .on('user_objectives.user_id', userId);
            })
            .withGraphFetched('weapons')
            .modifyGraph('weapons', (builder) => {
                builder.select('weapons.*', 'user_weapons.have_weapon')
                    // eslint-disable-next-line func-names
                    .leftJoin('user_weapons', function () {
                        this.on('weapons.id', 'user_weapons.weapon_id')
                            .on('user_weapons.user_id', userId);
                    });
            })
            .where('objectives.id', objectiveId)
            .first();
    }

}

export default ObjectiveRepositoryImpl;