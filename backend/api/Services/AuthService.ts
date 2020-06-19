import UserCredentials from "../Dtos/UserCredentialsDto";

interface AuthService {

    login(email: string, password: string): Promise<UserCredentials>;

    register(username: string, email: string, password: string): Promise<UserCredentials>;

    resetPassword(token: string, password: string, confirmPassword: string): Promise<void>;

    refreshToken(refreshToken: string): Promise<UserCredentials>;

}

export default AuthService;