export type UserRole = 'attendee' | 'organizer';

export interface IUser { 
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}

export interface ISignupPayload { 
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface ILoginPayload { 
    email: string;
    password: string;
}

export interface IAuthResponse { 
    id: number;
    name: string;
    email: string;
    role: UserRole;
}