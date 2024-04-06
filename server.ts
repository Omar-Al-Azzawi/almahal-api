import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from "helmet";
import authRoutes from './src/routes/authRoutes';
import productRoutes from './src/routes/productRoutes'
import { authenticateToken } from './src/middlewares/authMiddleware';
import dotenv from "dotenv"
import connectToMongoDB from './db';

const app = express();

dotenv.config()
app.use(cors());
app.use(helmet())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

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
