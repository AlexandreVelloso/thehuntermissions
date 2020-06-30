export interface LoginCredentials {
    id: number;
    username: string;
    email: string;
}

export default interface UserCredentials {
    user: LoginCredentials;
    access_token: string;
    refresh_token: string;
}