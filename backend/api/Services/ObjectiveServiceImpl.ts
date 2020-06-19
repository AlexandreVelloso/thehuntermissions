import ObjectiveService from "./ObjectiveService";
import ObjectiveRepository from "../Repositories/ObjectiveRepository";
import userHaveAllObjectiveWeapons from '../Utils/userHaveAllObjectiveWeapons';
import ObjectiveModel from "../../database/models/ObjectiveModel";
import EntityNotFoundException from "../Exceptions/EntityNotFoundException";
import UserObjectiveRepository from "../Repositories/UserObjectiveRepository";

class ObjectiveServiceImpl implements ObjectiveService {

    private objectiveRepository: ObjectiveRepository;
    private userObjectiveRepository: UserObjectiveRepository;

    public constructor(
        objectiveRepository: ObjectiveRepository,
        userObjectiveRepository: UserObjectiveRepository,
    ) {
        this.objectiveRepository = objectiveRepository;
        this.userObjectiveRepository = userObjectiveRepository;
    }

    async index(userId: number): Promise<ObjectiveModel[]> {
        const objectives = await this.objectiveRepository
            .getObjectivesByUser(userId);

        for (let index = 0; index < objectives.length; index += 1) {
            const { weapons } = objectives[index];
            objectives[index].have_weapon = userHaveAllObjectiveWeapons(weapons);
        }

        return objectives;
    }

    async get(objectiveId: number, userId: number): Promise<ObjectiveModel> {
        const objective = await this.objectiveRepository
            .findObjectiveByUser(objectiveId, userId);

        if (!objective) {
            throw new EntityNotFoundException('Objective not found');
        }

        objective.have_weapon = userHaveAllObjectiveWeapons(objective.weapons);

        return objective;
    }

    async update(objectiveId: number, isObjectiveCompleted: boolean, userId: number): Promise<void> {
        const objective = await this.objectiveRepository
            .findById(objectiveId);

        if (!objective) {
            throw new EntityNotFoundException('Objective not found');
        }

        const userObjective = await this.userObjectiveRepository
            .findByObjectiveAndUser(objectiveId, userId);

        if (userObjective) {
            await this.userObjectiveRepository
                .update(objectiveId, userId, isObjectiveCompleted);
        } else {
            await this.userObjectiveRepository
                .insert(objectiveId, userId, isObjectiveCompleted);
        }
    }

}

export default ObjectiveServiceImpl;