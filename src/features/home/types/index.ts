export interface SignUpData {
    name: string;
    email: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface LoginResponse {
    tokens: {
        access: string;
        refresh: string;
    };
}