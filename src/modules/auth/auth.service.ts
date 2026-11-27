import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/env';
import AppError from '../../utils/AppError';
import type { IAuthResponse, ILoginPayload, ISignupPayload } from './auth.interface';
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

const login = async (payload: ILoginPayload) => {
    // Find user by email
    const user = await authRepository.findUserByEmail(payload.email);

    if (!user) {
        throw new AppError(401, 'Invalid email or password');
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatched) {
        throw new AppError(401, 'Invalid email or password');
    }

    const jwtPayload = {
        id: user.id,
        role: user.role
    };

    const jwtExpiresIn = {
        expiresIn: config.jwt_expires_in as NonNullable<jwt.SignOptions['expiresIn']>
    };

    // Generate access token
    const token = jwt.sign(jwtPayload, config.jwt_secret, jwtExpiresIn);

    // Prepare user information
    const userInfo: IAuthResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    return {
        token,
        user: userInfo
    };
};

export const authService = {
    signup,
    login
};
