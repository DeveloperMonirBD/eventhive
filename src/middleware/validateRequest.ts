import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import AppError from '../utils/AppError';

const validateRequest = (schema: ZodType): RequestHandler => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }));

            return next(new AppError(400, 'Validation Error', errors));
        }

        req.body = result.data;

        next();
    };
};

export default validateRequest;
