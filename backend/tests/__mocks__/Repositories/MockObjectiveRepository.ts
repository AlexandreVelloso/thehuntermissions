import ObjectiveRepository from "../../../api/Repositories/ObjectiveRepository";

class MockObjectiveRepository implements ObjectiveRepository {

    public findObjectiveByUser(objectiveId: any, userId: any): any {
        if (objectiveId <= 0 || objectiveId > 1000) {
            return undefined;
        }

        return {
            id: 1,
            name: 'Objective',
            mission_id: 1,
            user_id: 1,
            completed: 1,
            weapons: [],
            equipaments: [],
            created_at: '',
            updated_at: '',
        }
    }

    public getObjectivesByUser(userId: any): any {
        return [
            {
                id: 1,
                name: 'Objective 1',
                mission_id: 1,
                user_id: 1,
                completed: 1,
                weapons: [],
                equipaments: [],
                created_at: '',
                updated_at: '',
            },
            {
                id: 2,
                name: 'Objective 2',
                mission_id: 1,
                user_id: 1,
                completed: 0,
                weapons: [],
                equipaments: [],
                created_at: '',
                updated_at: '',
            }
        ];
    }

    public async getObjectivesByMissionId(missionId: number): Promise<any> {
        return [
            {
                id: 1,
                name: 'Objective 1',
                mission_id: 1,
                user_id: 1,
                completed: 1,
                weapons: [],
                equipaments: [],
                created_at: '',
                updated_at: '',
            },
            {
                id: 2,
                name: 'Objective 2',
                mission_id: 1,
                user_id: 1,
                completed: 1,
                weapons: [],
                equipaments: [],
                created_at: '',
                updated_at: '',
            },
            {
                id: 3,
                name: 'Objective 3',
                mission_id: 1,
                user_id: 1,
                completed: 1,
                weapons: [],
                equipaments: [],
                created_at: '',
                updated_at: '',
            }
        ];
    }

    public findById(id: number): any {
        if (id <= 0 || id > 1000) {
            return undefined;
        }

        return {
            id: 1,
            name: 'Objective',
            mission_id: 1,
            user_id: 1,
            completed: 1,
            weapons: [],
            equipaments: [],
            created_at: '',
            updated_at: '',
        }
    }

}

export default MockObjectiveRepository;