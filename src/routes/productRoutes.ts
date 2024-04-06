import express from 'express';
import { authenticateToken } from "../middlewares/authMiddleware"
import { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct 
} from '../controllers/productController';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', authenticateToken, createProduct);
router.put('/products/:id', authenticateToken, updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

export default router;
