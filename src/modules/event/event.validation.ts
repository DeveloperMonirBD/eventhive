import { z } from 'zod';

// Create Event validation
export const createEventValidationSchema = z.object({
    title: z.string().min(1, 'Event title is required'),
    description: z.string().min(1, 'Event description is required'),
    category: z.string().min(1, 'Event category is required'),
    date: z.iso.datetime({
        message: 'Invalid event date'
    }),
    location: z.string().min(1, 'Event location is required'),
    total_seats: z.number().int().positive('Total seats must be greater than 0'),
    price: z.number().nonnegative('Price cannot be negative')
});

// Update Event validation
export const updateEventValidationSchema = createEventValidationSchema
    .partial()
    .refine(data => Object.keys(data).length > 0, {
        message: 'At least one field is required to update an event'
    });

export type TCreateEvent = z.infer<typeof createEventValidationSchema>;

export type TUpdateEvent = z.infer<typeof updateEventValidationSchema>;