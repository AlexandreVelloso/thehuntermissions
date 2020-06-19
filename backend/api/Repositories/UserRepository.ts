import BaseRepository from "./BaseRepository";
import UserModel from "../../database/models/UserModel";

interface UserRepository extends BaseRepository<UserModel> {

    findByEmail(email: string): Promise<UserModel>;

    findByRefreshToken(refreshToken: string): Promise<UserModel>;

    insert(email: string, username: string, password: string, refreshToken: string): Promise<UserModel>;

    updatePasswordByEmail(email: string, password: string): Promise<void>;
    
}

export default UserRepository;