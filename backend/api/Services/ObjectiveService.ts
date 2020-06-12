import ObjectiveModel from '../../database/models/ObjectiveModel';
import UserObjectiveModel from '../../database/models/UserObjectiveModel';
import EntityNotFoundException from '../Exceptions/EntityNotFoundException';
import userHaveAllObjectiveWeapons from '../Utils/userHaveAllObjectiveWeapons';

class ObjectiveService {
    static async index(userId: string) {
        const objectives = await ObjectiveModel.query()
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

        for (let index = 0; index < objectives.length; index += 1) {
            const { weapons } = objectives[index];
            objectives[index].have_weapon = userHaveAllObjectiveWeapons(weapons);
        }

        return objectives;
    }

    static async get(objectiveId: string, userId: string) {
        const objective = await ObjectiveModel.query()
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

        if (!objective) {
            throw new EntityNotFoundException('Objective not found');
        }

        objective.have_weapon = userHaveAllObjectiveWeapons(objective.weapons);

        return objective;
    }

    static async update(objectiveId: string, objectiveCompleted: boolean, userId: string) {
        const objective = await ObjectiveModel.query()
            .where('id', objectiveId)
            .first();

        if (!objective) {
            throw new EntityNotFoundException('Objective not found');
        }

        const userObjective = await UserObjectiveModel.query()
            .where('objective_id', objectiveId)
            .where('user_id', userId)
            .first();

        if (userObjective) {
            await UserObjectiveModel.query()
                .where('objective_id', objectiveId)
                .where('user_id', userId)
                .patch({
                    completed: objectiveCompleted,
                });
        } else {
            await UserObjectiveModel.query()
                .insert({
                    objective_id: objective.id,
                    user_id: userId,
                    completed: objectiveCompleted,
                });
        }
    }
}

export default ObjectiveService;
