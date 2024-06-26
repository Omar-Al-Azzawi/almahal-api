import { NextFunction, Request, Response } from 'express';
import Company from '../models/Company';
import Shop from '../models/Shop';

export const createCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const owner = (req as any).user.userId;
      
      const company = new Company({ name, owner })
      await company.save()

      res.status(201).json({ message: 'Shop created successfully', company })
    } catch (error) {
      next(error)
    }
}

export const getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companyId } = req.body 
      
      const company = await Company.findById(companyId);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      res.status(200).json({ company: company })
    } catch (error) {
      next(error)
    }
}

export const getCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companies = await Company.find();

        if (!companies) {
            return res.status(404).json({ message: 'companies not found'})
        }

        res.status(201).json({ companies })
    } catch (error) {
        next(error)
    }
}

export const addShopToCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { shopId, companyId } = req.body;

    const shop = await Shop.findById(shopId)
    const company = await Company.findById(companyId)
 
    if (!shop || !company) {
      return res.status(404).json({ message: 'Company or shop not found' });
    }

    company.shops.push(shop._id);
    await company.save();

    res.status(200).json({ message: 'Shop added to company successfully', company, shop });
  } catch (error) {
    next(error)
  }
}
