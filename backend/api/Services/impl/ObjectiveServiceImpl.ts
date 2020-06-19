import ObjectiveService from "../ObjectiveService";
import ObjectiveRepository from "../../Repositories/ObjectiveRepository";
import ObjectiveModel from "../../../database/models/ObjectiveModel";
import EntityNotFoundException from "../../Exceptions/EntityNotFoundException";
import UserObjectiveRepository from "../../Repositories/UserObjectiveRepository";
import ObjectiveDto from "../../Dtos/ObjectiveDto";
import UserObjectiveModel from "../../../database/models/UserObjectiveModel";

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

    async index(userId: number): Promise<ObjectiveDto[]> {
        const objectives: ObjectiveModel[] = await this.objectiveRepository
            .getObjectivesByUser(userId);

        const objectivesDto: ObjectiveDto[] = ObjectiveDto.toDto(objectives);

        return objectivesDto;
    }

    async get(objectiveId: number, userId: number): Promise<ObjectiveDto> {
        const objective: ObjectiveModel = await this.objectiveRepository
            .findObjectiveByUser(objectiveId, userId);

        if (!objective) {
            throw new EntityNotFoundException('Objective not found');
        }

        const objectiveDto: ObjectiveDto = ObjectiveDto.toDto(objective);

        return objectiveDto;
    }

    async update(objectiveId: number, isObjectiveCompleted: boolean, userId: number): Promise<void> {
        const objective: ObjectiveModel = await this.objectiveRepository
            .findById(objectiveId);

        if (!objective) {
            throw new EntityNotFoundException('Objective not found');
        }

        const userObjective: UserObjectiveModel = await this.userObjectiveRepository
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