import express from 'express';
import { authenticateToken } from "../middlewares/authMiddleware"
import { 
    createWarehouse, 
    addProductToWarehouse, 
    getWarehouseProduct 
} from '../controllers/warehouseController';

const router = express.Router();

router.post('/create', authenticateToken, createWarehouse);
router.post('/add-product-warehouse', authenticateToken, addProductToWarehouse);
router.get('/:warehouseId/products', authenticateToken, getWarehouseProduct);

export default router;