import UserRepository from "../../../api/Repositories/UserRepository";

class MockUserRepository implements UserRepository {

    findByEmail(email: string): any {
        if (email === '') {
            return undefined;
        }

        return {
            username: 'username',
            email: 'email@email.com',
            password: 'password',
            refresh_token: 'refresh_token',
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

    insert(email: string, username: string, password: string, refreshToken: string): any { }

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