import express from 'express';
import { authenticateToken } from "../middlewares/authMiddleware"
import { createShop, addProductToShop } from '../controllers/shopController';

const router = express.Router();

router.post('/shop', authenticateToken, createShop);
router.post('/add-product', authenticateToken, addProductToShop);

export default router;
