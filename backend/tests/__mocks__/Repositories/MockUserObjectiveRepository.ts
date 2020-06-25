import UserObjectiveRepository from "../../../api/Repositories/UserObjectiveRepository";

class MockUserObjectiveRepository implements UserObjectiveRepository {

    public findByObjectiveAndUser(objectiveId: number, userId: number): any {
        if (objectiveId <= 0 || objectiveId > 100) {
            return undefined;
        }

        return {
            objective_id: 1,
            user_id: 1,
            completed: 1,
        }
    }

    public async getObjectivesByUserWhereObjectivesIn(userId: number, objectivesIds: number[]): Promise<any> {
        if (objectivesIds.length === 0) {
            return undefined;
        }

        return [
            {
                objective_id: 1,
                user_id: 1,
                completed: 1,
            },
            {
                objective_id: 2,
                user_id: 1,
                completed: 0,
            },
        ];
    }

    public insert(objectiveId: number, userId: number, isObjectiveCompleted: boolean): any { }

    public insertMany(userObjectives: any[]): any { }

    public update(objectiveId: number, userId: number, isObjectiveCompleted: boolean): any { }

    public updateMany(objectivesIds: number[], objectiveCompleted: boolean): any { }

    public findById(id: number): any {
        if (id <= 0 || id > 100) {
            return undefined;
        }

        return {
            objective_id: 1,
            user_id: 1,
            completed: 1,
        }
    }

}

export default MockUserObjectiveRepository;