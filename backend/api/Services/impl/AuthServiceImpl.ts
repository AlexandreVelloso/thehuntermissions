import randtoken from 'rand-token';

import UserModel from '../../../database/models/UserModel';
import { sign, verify } from '../../Utils/JwtToken';
import ValidationException from '../../Exceptions/ValidationException';
import UnauthorizedOperationException from '../../Exceptions/UnauthorizedOperationException';
import StartWeaponsService from '../StartWeaponsService';
import AuthService from '../AuthService';
import UserCredentials from '../../Dtos/UserCredentialsDto';
import UserRepository from '../../Repositories/UserRepository';
import StartEquipamentsService from '../StartEquipamentsService';

class AuthServiceImpl implements AuthService {

    private userRepository: UserRepository;
    private startWeaponsService: StartWeaponsService;
    private startEquipamentsService: StartEquipamentsService;

    public constructor(opts: any) {
        this.userRepository = opts.userRepository;
        this.startWeaponsService = opts.startWeaponsService;
        this.startEquipamentsService = opts.startEquipamentsService;
    }

    generateToken(user: UserModel) {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    }

    generateUserResponse(user: UserModel): UserCredentials {
        const accessToken = `Bearer ${this.generateToken(user)}`;

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            access_token: accessToken,
            refresh_token: user.refresh_token,
        };
    };

    async login(email: string, password: string): Promise<UserCredentials> {
        const user = await this.userRepository
            .findByEmail(email);

        if (!user || !await user.verifyPassword(password)) {
            throw new ValidationException('Email or password incorrect');
        }

        return this.generateUserResponse(user);
    }

    async register(username: string, email: string, password: string): Promise<UserCredentials> {
        const userDB = await this.userRepository
            .findByEmail(email);

        if (userDB) {
            throw new ValidationException('Email already exists');
        }

        const refreshToken = randtoken.uid(256);

        const user = await this.userRepository
            .insert(email, username, password, refreshToken);

        await this.startWeaponsService
            .addWeapons(user.id);

        await this.startEquipamentsService
            .addEquipament(user.id);

        return this.generateUserResponse(user);
    }

    async resetPassword(token: string, password: string, confirmPassword: string): Promise<void> {
        let email;

        try {
            email = verify(token).email;
        } catch (err) {
            throw new ValidationException('Invalid token');
        }

        if (password !== confirmPassword) {
            throw new ValidationException('The passwords don\'t match');
        }

        const user = await this.userRepository
            .findByEmail(email);

        if (!user) {
            throw new ValidationException('User not found');
        }

        await this.userRepository
            .updatePasswordByEmail(email, password);
    }

    async refreshToken(refreshToken: string): Promise<UserCredentials> {
        const user = await this.userRepository
            .findByRefreshToken(refreshToken);

        if (!user) {
            throw new UnauthorizedOperationException('Invalid refresh token');
        }

        return this.generateUserResponse(user);
    }
}

export default AuthServiceImpl;
