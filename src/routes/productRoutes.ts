import express from 'express';
import { createProduct, getUserProducts } from '../controllers/productController';

const router = express.Router();

router.post('/createProduct', createProduct);
router.get('/getUserProducts', getUserProducts);

export default router;
