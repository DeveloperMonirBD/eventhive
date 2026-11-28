import type { ICreateEventPayload } from './event.interface';
import { eventRepository } from './event.repository';

// create event
const createEvent = async (payload: ICreateEventPayload, organizerId: number) => {
    const result = await eventRepository.createEvent(payload, organizerId);
    return result
};


export const eventService = {
    createEvent
}