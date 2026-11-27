import type { UserRole } from "../modules/auth/auth.interface";

declare global { 
    namespace Express { 
        interface Request { 
            user?: {
                id: number;
                role: UserRole;
            }
        }
    }
}

export {};