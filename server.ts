import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes';

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});