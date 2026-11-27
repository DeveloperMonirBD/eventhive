import { Pool } from 'pg';
import config from './env';

export const pool = new Pool({
    connectionString: config.connection_string
});

export const initDB = async () => {
    try {
        const result = await pool.query('SELECT NOW()');

        console.log('Database connected successfully!');
        console.log('Database time:', result.rows[0].now);
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};