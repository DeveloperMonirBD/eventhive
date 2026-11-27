import { z } from 'zod';

export const signupValidationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['attendee', 'organizer']).optional()
});

export const loginValidationSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});