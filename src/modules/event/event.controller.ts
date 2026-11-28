import type { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { eventService } from './event.service';

// create event
const createEvent = async (req: Request, res: Response) => {
    const result = await eventService.createEvent(req.body, req.user!.id);

    sendResponse(res, {
        statusCode: 201,
        message: 'Event created successfully',
        data: result
    });
};

export const eventController = {
    createEvent
};
