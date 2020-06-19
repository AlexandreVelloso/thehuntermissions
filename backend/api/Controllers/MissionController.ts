import MissionService from '../Services/MissionService';
import BaseController from './BaseController';

class MissionController extends BaseController {
    
    protected async indexImpl(user: any): Promise<any> {
        const missions = await MissionService.index(user.id);

        return this.ok(missions);
    }

    protected async getImpl(user: any): Promise<any> {
        const { id: missionId } = this.req.params;

        const mission = await MissionService.get(missionId, user.id);

        return this.ok(mission);
    }

    protected async updateImpl(user: any): Promise<any> {
        const { id: missionId } = this.req.params;
        const { completed } = this.req.body;

        await MissionService.update(missionId, completed, user.id);

        return this.noContent();
    }
}

export default MissionController;
