import MissionRepository from "../../../api/Repositories/MissionRepository";

class MockMissionRepository implements MissionRepository {

    public findMissionByUser(missionId: number, userId: any): any {
        if (missionId <= 0 || missionId > 100) {
            return undefined;
        }

        return {
            id: 1,
            name: 'Mission name',
            reward: 100,
            hint: 'hint',
            animal_id: 1,
            objectives: [
                {
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
            ],
            created_at: '',
            updated_at: '',
        };
    }

    public getMissionsByUser(userId: any): any {
        return [
            {
                id: 1,
                name: 'Mission 1',
                reward: 100,
                hint: 'hint',
                animal_id: 1,
                objectives: [
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
                    }
                ],
                created_at: '',
                updated_at: '',
            },
            {
                id: 2,
                name: 'Mission 2',
                reward: 200,
                hint: 'hint',
                animal_id: 1,
                objectives: [
                    {
                        id: 1,
                        name: 'Objective 2',
                        mission_id: 2,
                        user_id: 1,
                        completed: 0,
                        weapons: [],
                        equipaments: [],
                        created_at: '',
                        updated_at: '',
                    }
                ],
                created_at: '',
                updated_at: '',
            }
        ];
    }

    public findById(id: number): any {
        if (id <= 0 || id > 100) {
            return undefined;
        }

        return {
            id: 1,
            name: 'Mission name',
            reward: 100,
            hint: 'hint',
            animal_id: 1,
            objectives: [
                {
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
            ],
            created_at: '',
            updated_at: '',
        };
    }

}

export default MockMissionRepository;