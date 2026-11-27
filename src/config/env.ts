import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env')
});

const getEnv = (key: string): string => {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

const config = {
    port: Number(process.env.PORT) || 5000,
    connection_string: getEnv('DATABASE_URL'),
    jwt_secret: getEnv('JWT_SECRET'),
    jwt_refresh_secret: getEnv('JWT_REFRESH_SECRET'),
    jwt_expires_in: getEnv('JWT_EXPIRES_IN')
};

export default config;
