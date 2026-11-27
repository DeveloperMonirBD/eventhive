import type { Response } from 'express';

type TSuccessResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};

export const sendResponse = <T>(res: Response, response: TSuccessResponse<T>): Response => {
    return res.status(response.statusCode).json({
        success: true,
        message: response.message,
        data: response.data
    });
};
