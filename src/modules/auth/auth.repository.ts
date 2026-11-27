import { pool } from '../../config/db';
import type { ISignupPayload, IUser } from './auth.interface';

const createUser = async (payload: ISignupPayload): Promise<IUser> => {
    const { name, email, password, role } = payload;

    const result = await pool.query(
        `INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, COALESCE($4, 'attendee'))
        RETURNING *`,
        [name, email, password, role ?? null]
    );
    
    return result.rows[0] as IUser;
};

const findUserByEmail = async (email: string): Promise<IUser | null> => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return result.rows[0] ?? null;
};

const findUserById = async (id: number): Promise<IUser | null> => { 
    const result = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
    );

    return result.rows[0] ?? null;
}


export const authRepository = {
    createUser,
    findUserByEmail,
    findUserById
};