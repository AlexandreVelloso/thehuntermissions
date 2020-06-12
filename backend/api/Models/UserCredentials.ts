interface LoginCredentials {
    username: string;
    email: string;
}

export default interface UserCredentials {
    user: LoginCredentials;
    accessToken: string;
    refreshToken: string;
}