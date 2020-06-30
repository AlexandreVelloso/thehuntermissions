import UserRepository from "../../../api/Repositories/UserRepository";

class MockUserRepository implements UserRepository {

    findByEmail(email: string): any {
        if (email !== 'email@email.com') {
            return undefined;
        }

        function verifyPassword(password: string) {
            return password === 'password';
        }

        return {
            username: 'username',
            email: 'email@email.com',
            password: 'password',
            refresh_token: 'refresh_token',
            verifyPassword: verifyPassword
        }
    }

    findByRefreshToken(refreshToken: string): any {
        if (refreshToken === '') {
            return undefined;
        }

        return {
            username: 'username',
            email: 'email@email.com',
            password: 'password',
            refresh_token: 'refresh_token',
        }
    }

    insert(email: string, username: string, password: string, refreshToken: string): any {
        return {
            username,
            email,
            password: 'hashPassword',
            refresh_token: 'refresh_token',
        }
    }

    updatePasswordByEmail(email: string, password: string): any { }

    findById(id: number): any {
        if (id <= 0 || id > 1000) {
            return undefined;
        }

        return {
            username: 'username',
            email: 'email@email.com',
            password: 'password',
            refresh_token: 'refresh_token',
        }
    }
}

export default MockUserRepository;