import ObjectiveModel from '../../database/models/ObjectiveModel';

interface ObjectiveService {

    index(userId: number): Promise<ObjectiveModel[]>;

    get(objectiveId: number, userId: number): Promise<ObjectiveModel>

    update(objectiveId: number, objectiveCompleted: boolean, userId: number): Promise<void>;
    
}

export default ObjectiveService;