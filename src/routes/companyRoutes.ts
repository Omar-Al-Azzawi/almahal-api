import express from 'express';
import { authenticateToken } from "../middlewares/authMiddleware"
import { addShopTOCompany, createCompany, getCompanies, getCompanyById } from '../controllers/companyController';

const router = express.Router();

router.get('/', getCompanies);
router.get('/:id', authenticateToken, getCompanyById);
router.post('/create', authenticateToken, createCompany);
router.post('/add-shop-company', authenticateToken, addShopTOCompany);

export default router;