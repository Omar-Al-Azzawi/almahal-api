import express from 'express';
import { authenticateToken } from "../middlewares/authMiddleware"
import { 
    createShop, 
    addProductToShop, 
    getShopProducts 
} from '../controllers/shopController';

const router = express.Router();

router.post('/create', authenticateToken, createShop);
router.post('/add-product-shop', authenticateToken, addProductToShop);
router.get('/:shopId/products', authenticateToken, getShopProducts);

export default router;
