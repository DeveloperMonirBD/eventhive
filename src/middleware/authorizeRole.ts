import type { RequestHandler } from 'express';
import type { UserRole } from '../modules/auth/auth.interface';
import AppError from '../utils/AppError';

const authorizeRole = (...allowedRoles: UserRole[]): RequestHandler => {
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.user) {
            return next(new AppError(401, 'Unauthorized access'));
        }

        // Check user role permission
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError(403, 'You do not have permission to access this resource'));
        }

        next();
    };
};

export default authorizeRole;
