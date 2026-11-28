import authMiddleware from '../../middleware/auth.middleware';
import authorizeRole from '../../middleware/authorizeRole';

import { Router, type Request, type Response } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createEventValidationSchema } from './event.validation';
import catchAsync from '../../utils/catchAsync';
import { eventController } from './event.controller';

const router = Router();

router.post(
    '/',
    authMiddleware,
    authorizeRole('organizer'),
    validateRequest(createEventValidationSchema),
    catchAsync(eventController.createEvent)
)

router.get(
    '/test-organizer',
    authMiddleware,
    authorizeRole('organizer'),
    (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'Organizer access granted',
            data: {
                user: req.user
            }
        });
    }
);

export const eventRoute = router;