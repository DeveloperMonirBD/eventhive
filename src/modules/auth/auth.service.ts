import bcrypt from 'bcryptjs';
import AppError from '../../utils/AppError';
import type { ISignupPayload } from './auth.interface';
import { authRepository } from './auth.repository';

const signup = async (payload: ISignupPayload) => {
    // Check if the email already exists
    const existingUser = await authRepository.findUserByEmail(payload.email);

    if (existingUser) {
        throw new AppError(409, 'Email already registered');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    // Create user
    const user = await authRepository.createUser({
        ...payload,
        password: hashedPassword
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
};


export const authService = {
    signup
};