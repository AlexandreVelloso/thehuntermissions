import ObjectiveDto from '../Dtos/ObjectiveDto';

interface ObjectiveService {

    index(userId: number): Promise<ObjectiveDto[]>;

    get(objectiveId: number, userId: number): Promise<ObjectiveDto>

    update(objectiveId: number, objectiveCompleted: boolean, userId: number): Promise<void>;
    
}

export default ObjectiveService;