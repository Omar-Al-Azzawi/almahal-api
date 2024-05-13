import express from 'express';
import multer from 'multer'
import { authenticateToken } from "../middlewares/authMiddleware"
import { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct, 
    addNoteToProduct,
    getProductNotes,
    getProductsByUserId
} from '../controllers/productController';

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage})

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:userId', authenticateToken, getProductsByUserId);
router.get('/:id/notes', authenticateToken, getProductNotes);
router.post('/create', authenticateToken, upload.single('image'), createProduct);
router.post('/note', authenticateToken, addNoteToProduct)
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;
