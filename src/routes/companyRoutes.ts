import express from 'express';
import { authenticateToken } from "../middlewares/authMiddleware"
import { createCompany, getCompanies, getCompanyById } from '../controllers/companyController';

const router = express.Router();

router.post('/company', authenticateToken, createCompany);
router.get('/company', authenticateToken, getCompanyById)
router.get('/companies', getCompanies)

export default router;