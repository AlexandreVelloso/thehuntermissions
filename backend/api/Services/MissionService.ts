import UserModel from "../../database/models/UserModel";

interface MissionService {

    index(userId: number): Promise<UserModel[]>;

    get(missionId: number, userId: number): Promise<UserModel>;

    update(missionId: number, missionCompleted: boolean, userId: number): Promise<void>;

}

export default MissionService;