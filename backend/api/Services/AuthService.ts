import randtoken from 'rand-token';

import UserModel from '../../database/models/UserModel';
import { sign, verify } from '../Utils/JwtToken';
import ValidationException from '../Exceptions/ValidationException';
import UnauthorizedOperationException from '../Exceptions/UnauthorizedOperationException';
import StartWeaponsService from './StartWeaponsService';
import User from '../Models/User';

const generateToken = (user: User) => sign({
    id: user.id,
    username: user.username,
    email: user.email,
});

const generateUserResponse = (user: User) => {
    const accessToken = `Bearer ${generateToken(user)}`;

    return {
        user: {
            username: user.username,
            email: user.email,
        },
        accessToken,
        refreshToken: user.refresh_token,
    };
};

class AuthService {
    static async login(email: string, password: string) {
        const user = await UserModel.query()
            .where('email', email)
            .first();

        if (!user || !await user.verifyPassword(password)) {
            throw new ValidationException('Username or password incorrect');
        }

        return generateUserResponse(user);
    }

    static async register(username: string, email: string, password: string) {
        const userDB = await UserModel.query()
            .where('email', email)
            .first();

        if (userDB) {
            throw new ValidationException('Email already exists');
        }

        const refreshToken = randtoken.uid(256);

        const user = await UserModel.query()
            .insert({
                email,
                username,
                password,
                refresh_token: refreshToken,
            });

        await StartWeaponsService.addWeapons(user.id);

        return generateUserResponse(user);
    }

    static async resetPassword(token: string, password: string, confirmPassword: string) {
        let email;

        try {
            email = verify(token).email;
        } catch (err) {
            throw new ValidationException('Invalid token');
        }

        if (password !== confirmPassword) {
            throw new ValidationException('The passwords doesn\'t match');
        }

        const user = await UserModel.query()
            .where('email', email)
            .first();

        if (!user) {
            throw new ValidationException('User not found');
        }

        await UserModel.query()
            .where('email', email)
            .patch({
                password,
            });
    }

    static async refreshToken(refreshToken: string) {
        const user = await UserModel.query()
            .where('refresh_token', refreshToken)
            .first();

        if (!user) {
            throw new UnauthorizedOperationException('Invalid refresh token');
        }

        return generateUserResponse(user);
    }
}

export default AuthService;
