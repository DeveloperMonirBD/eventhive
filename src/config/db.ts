import { Pool } from 'pg';
import config from './env';

export const pool = new Pool({
    connectionString: config.connection_string
});

export const initDB = async () => {
    try {
        // 1. Users Table
        // 2. Events Table
        // 3. Bookings Table

        // 4. Updated At Trigger Function

        // 5. Users Trigger
        // 6. Events Trigger
        // 7. Bookings Trigger

        // 1. Users Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) NOT NULL DEFAULT 'attendee'
                    CHECK (role IN ('attendee', 'organizer')),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `);

        // 2. Events Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                category VARCHAR(100) NOT NULL,
                date TIMESTAMPTZ NOT NULL,
                location VARCHAR(255) NOT NULL,
                total_seats INTEGER NOT NULL
                    CHECK (total_seats > 0),
                available_seats INTEGER NOT NULL
                    CHECK (
                        available_seats >= 0
                        AND available_seats <= total_seats
                    ),
                price NUMERIC(10, 2) NOT NULL
                    CHECK (price >= 0),
                organizer_id INTEGER NOT NULL
                    REFERENCES users(id),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `);

        // 3. Bookings Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                event_id INTEGER NOT NULL
                    REFERENCES events(id) ON DELETE CASCADE,
                attendee_id INTEGER NOT NULL
                    REFERENCES users(id),
                tickets_booked INTEGER NOT NULL
                    CHECK (tickets_booked > 0),
                total_price NUMERIC(10, 2) NOT NULL
                    CHECK (total_price >= 0),
                status VARCHAR(20) NOT NULL DEFAULT 'confirmed'
                    CHECK (status IN ('confirmed', 'cancelled')),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `);

        // 4. Updated At Trigger Function
        await pool.query(`
            CREATE OR REPLACE FUNCTION update_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        // 5. Users Trigger
        await pool.query(`
            DROP TRIGGER IF EXISTS users_updated_at_trigger ON users;

            CREATE TRIGGER users_updated_at_trigger
            BEFORE UPDATE ON users
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at();
        `);

        // 6. Events Trigger
        await pool.query(`
            DROP TRIGGER IF EXISTS events_updated_at_trigger ON events;

            CREATE TRIGGER events_updated_at_trigger
            BEFORE UPDATE ON events
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at();
        `);

        // 7. Bookings Trigger
        await pool.query(`
            DROP TRIGGER IF EXISTS bookings_updated_at_trigger ON bookings;

            CREATE TRIGGER bookings_updated_at_trigger
            BEFORE UPDATE ON bookings
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at();
        `);

        await console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};
