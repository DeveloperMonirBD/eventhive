import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import catchAsync from "../../utils/catchAsync";
import { authController } from "./auth.controller";
import { signupValidationSchema } from "./auth.validation";


const router = Router();

// Signup Route 
router.post(
    '/signup',
    validateRequest(signupValidationSchema),
    catchAsync(authController.signup)
);

export const authRoute = router;