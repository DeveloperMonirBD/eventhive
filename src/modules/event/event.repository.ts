import { pool } from '../../config/db';
import type { ICreateEventPayload, IEvent, IUpdateEventPayload } from './event.interface';

// create event
const createEvent = async (payload: ICreateEventPayload, organizerId: number): Promise<IEvent> => {
    const { title, description, category, date, location, total_seats, price } = payload;

    const result = await pool.query(
        `
        INSERT INTO events (
            title,
            description,
            category,
            date,
            location,
            total_seats,
            available_seats,
            price,
            organizer_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $6, $7, $8)
        RETURNING *
        `,
        [title, description, category, date, location, total_seats, price, organizerId]
    );

    return result.rows[0] as IEvent;
};

// get all events
const getAllEvents = async (): Promise<IEvent[]> => {
    const result = await pool.query(
        `
        SELECT *
        FROM events
        ORDER BY created_at DESC
        `
    );

    return result.rows as IEvent[];
};

// get single event
const getEventById = async (id: number): Promise<IEvent | null> => {
    const result = await pool.query(
        `
        SELECT *
        FROM events
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0] ?? null;
};

// update event
const updateEvent = async (
    payload: IUpdateEventPayload,
    id: number,
    organizerId: number
): Promise<IEvent | null> => {
    const { title, description, category, date, location, total_seats, price } = payload;

    const result = await pool.query(
        `
        UPDATE events SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            category = COALESCE($3, category),
            date = COALESCE($4, date),
            location = COALESCE($5, location),
            total_seats = COALESCE($6, total_seats),
            available_seats = available_seats +
                (COALESCE($6, total_seats) - total_seats),
            price = COALESCE($7, price),
            updated_at = NOW()
        WHERE id = $8
          AND organizer_id = $9
          AND COALESCE($6, total_seats) >=
              (total_seats - available_seats)
        RETURNING *
        `,
        [
            title ?? null,
            description ?? null,
            category ?? null,
            date ?? null,
            location ?? null,
            total_seats ?? null,
            price ?? null,
            id,
            organizerId
        ]
    );

    return result.rows[0] ?? null;
};

// delete event
const deleteEvent = async (id: number, organizerId: number): Promise<boolean> => {
    const result = await pool.query(
        `
        DELETE FROM events
        WHERE id = $1
          AND organizer_id = $2
          AND NOT EXISTS (
              SELECT 1
              FROM bookings
              WHERE bookings.event_id = events.id
          )
        RETURNING id
        `,
        [id, organizerId]
    );

    return (result.rowCount ?? 0) > 0;
};
