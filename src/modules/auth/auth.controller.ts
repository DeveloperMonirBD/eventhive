import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const signup = async (req: Request, res: Response) => { 
    const result = await authService.signup(req.body);

    sendResponse(res, {
        statusCode: 201,
        message: 'User registered successfully',
        data: result
    })
}

export const authController = {
    signup
}