import express from 'express';
import { authenticateToken } from "../middlewares/authMiddleware"
import { createShop, addProductToShop, getShopProducts } from '../controllers/shopController';

const router = express.Router();

router.post('/shop', authenticateToken, createShop);
router.post('/add-product', authenticateToken, addProductToShop);
router.get('/shop/:shopId/products', authenticateToken, getShopProducts);

export default router;
