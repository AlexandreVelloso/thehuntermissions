import ObjectiveService from '../Services/ObjectiveService';
import BaseController from './BaseController';

class ObjectiveController extends BaseController {

    protected async indexImpl(user: any) {
        const objectives = await ObjectiveService.index(user.id);

        return this.ok(objectives);
    }

    protected async getImpl(user: any) {
        const { id: objectiveId } = this.req.params;

        const objective = await ObjectiveService.get(objectiveId, user.id);
        return this.ok(objective);
    }

    protected async updateImpl(user: any) {
        const { id } = this.req.params;
        const { completed } = this.req.body;

        await ObjectiveService.update(id, completed, user.id);

        return this.noContent();
    }
}

export default ObjectiveController;
