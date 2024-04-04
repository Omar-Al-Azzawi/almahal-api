import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes';
import productRoutes from './src/routes/productRoutes'
import { authenticateUser } from './src/middlewares/authMiddleware';
import dotenv from "dotenv"

const app = express();

dotenv.config()
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.get('/protected-route', authenticateUser, (req, res) => {
  res.status(200).json({ message: 'You have accessed the protected route', user: req.body });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
