import type { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { authService } from './auth.service';

const signup = async (req: Request, res: Response) => {
    const result = await authService.signup(req.body);

    sendResponse(res, {
        statusCode: 201,
        message: 'User registered successfully',
        data: result
    });
};

const login = async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    sendResponse(res, {
        statusCode: 200,
        message: 'Login Successful',
        data: result
    });
};

export const authController = {
    signup,
    login
};
