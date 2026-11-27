import authMiddleware from '../../middleware/auth.middleware';
import authorizeRole from '../../middleware/authorizeRole';

import { Router, type Request, type Response } from 'express';

const router = Router();

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