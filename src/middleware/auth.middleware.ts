import type { RequestHandler } from 'express';
import AppError from '../utils/AppError';
import  jwt  from 'jsonwebtoken';
import config from '../config/env';

interface ITokenPayload {
    id: number;
    role: 'attendee' | 'organizer';
}

const authMiddleware: RequestHandler = (req, res, next) => { 

    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) { 
        return next(new AppError(401, 'Unauthorized access'));
    }

    // Support both Bearer token and raw token
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

    if (!token) { 
        return next(new AppError(401, 'Unauthorized access'));
    }

    try {

        // Verify JWT token
        const decoded = jwt.verify(
            token,
            config.jwt_secret
        ) as ITokenPayload;

        // Attach authenticated user to request
        req.user = {
            id: decoded.id,
            role: decoded.role
        }

        next();
        
    } catch (error) {
        return next(new AppError(401, 'Unauthorized access'));
    }
}

export default authMiddleware;