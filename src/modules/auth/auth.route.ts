import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import catchAsync from "../../utils/catchAsync";
import { authController } from "./auth.controller";
import { loginValidationSchema, signupValidationSchema } from "./auth.validation";
import authMiddleware from "../../middleware/auth.middleware";


const router = Router();

// Signup Route 
router.post(
    '/signup',
    validateRequest(signupValidationSchema),
    catchAsync(authController.signup)
);

// Login Route
router.post(
    '/login',
    validateRequest(loginValidationSchema),
    catchAsync(authController.login)
);

router.get(
    '/me',
    authMiddleware,
    catchAsync(authController.getMe)
)

export const authRoute = router;