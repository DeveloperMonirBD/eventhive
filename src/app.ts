import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { Application, Request, Response } from 'express';
import express from 'express';

const app: Application = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Api route not found !!'
    });
});



export default app;