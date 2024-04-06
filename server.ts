import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes';
import productRoutes from './src/routes/productRoutes'
import { authenticateToken } from './src/middlewares/authMiddleware';
import dotenv from "dotenv"
import connectToMongoDB from './db';

const app = express();

dotenv.config()
app.use(cors());
app.use(bodyParser.json());

connectToMongoDB()

app.use('/auth', authRoutes);
app.use('/', productRoutes);

app.get('/protected-route', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'You have accessed the protected route', user: req.body });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
