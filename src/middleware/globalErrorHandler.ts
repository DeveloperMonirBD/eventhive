import type { ErrorRequestHandler } from 'express';
import AppError from '../utils/AppError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors;

    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
        errors = error.errors;
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors })
    });
};

export default globalErrorHandler;
