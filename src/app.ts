import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '@config/db';
import userRoutes from '@routes/user.routes';
import authRoutes from '@routes/auth.routes';
import contactRoutes from '@routes/contact.routes';
import messageRoutes from '@routes/message.routes'
import { setupSwagger } from '@config/swagger';

//import cors from 'cors';
//import morgan from 'morgan';


dotenv.config();
const app = express();
app.use(express.json());

// app.use(cors());
// //app.use(morgan('dev'));
// app.use(loggerMiddleware);

connectDB();
setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/message', messageRoutes);

export default app;
