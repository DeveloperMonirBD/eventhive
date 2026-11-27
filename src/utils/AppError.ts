interface IErrorDetail {
    field: string;
    message: string;
}

class AppError extends Error {
    public statusCode: number;
    public errors: IErrorDetail[] | undefined;

    constructor(statusCode: number, message: string, errors?: IErrorDetail[]) {
        super(message);

        this.statusCode = statusCode;
        this.errors = errors;
        this.name = 'AppError';

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
