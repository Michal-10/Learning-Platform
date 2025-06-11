import express, { Application, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import promptRoutes from './routes/promptRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';

import subCategoryRoutes from './routes/subCategory';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
