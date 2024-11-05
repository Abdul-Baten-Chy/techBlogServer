import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import router from './app/router';
import globalErrorHandler from './midleware/globalErrorHandler';
import notFoundApi from './midleware/notFoundApi';

const app: Application = express();
app.use(cookieParser());

const corsOptions = {
  origin: 'https://frontend-ivory-delta-48.vercel.app',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

//applicaton route
app.use('/api', router);

//global error handler
app.use(globalErrorHandler);

//not found API
app.use(notFoundApi);

export default app;
