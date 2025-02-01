import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js'
import activityRoutes from './routes/activity.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import examRoutes from './routes/exam.routes.js'
import resourceRoutes from './routes/resouce.routes.js'
import { URL } from './config.js';

const app = express();
app.use(morgan('dev'))

// Usar body-parser para analizar solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS
app.use(cors({
    origin: URL,
    credentials: true
}));

// Usar cookie-parser para manejar cookies
app.use(cookieParser());

//Routes
app.use('/api', authRoutes)
app.use('/api', activityRoutes)
app.use('/api', examRoutes)
app.use('/api', resourceRoutes)
app.use(paymentRoutes)

export { app }
