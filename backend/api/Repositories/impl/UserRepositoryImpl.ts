import UserModel from "../../../database/models/UserModel";
import UserRepository from "../UserRepository";

class UserRepositoryImpl implements UserRepository {

    async findById(userId: number): Promise<UserModel> {
        return await UserModel.query()
            .where('id', userId)
            .first();
    }

    async findByEmail(email: string): Promise<UserModel> {
        return await UserModel.query()
            .where('email', email)
            .first();
    }

    async findByRefreshToken(refreshToken: string): Promise<UserModel> {
        return await UserModel.query()
            .where('refresh_token', refreshToken)
            .first();
    }

    async insert(email: string, username: string, password: string, refreshToken: string): Promise<UserModel> {
        return await UserModel.query()
            .insert({
                email,
                username,
                password,
                refresh_token: refreshToken,
            });
    }

    async updatePasswordByEmail(email: string, password: string): Promise<void> {
        await UserModel.query()
            .where('email', email)
            .patch({
                password,
            });
    }

}

export default UserRepositoryImpl;