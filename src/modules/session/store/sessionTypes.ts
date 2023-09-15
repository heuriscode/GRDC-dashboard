export type TimeStamp = string;

export interface SessionState {
    user: SessionResponse | null;
}

export interface LoginBody {
    username: string;
    password: string;
}

export interface SessionResponse {
    name: string;
    roles: ReadonlyArray<Roles>;
    userId: string;
    username: string;
    email: string;
    avatarUrl: string;
}

export enum Roles {
    Admin = 'ADMIN',
}
