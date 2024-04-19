import { Request, Response } from 'express';
import Company from '../models/Company';

export const createCompany = async (req: Request, res: Response) => {
    try {
      const { name, owner } = req.body;

      const company = new Company({ name, owner })
      await company.save()

      res.status(201).json({ message: 'Shop created successfully', company })
    } catch (error) {
      res.status(500).json({ error: error });
    }
}

export const getCompanyById = async (req: Request, res: Response) => {
    try {
      const { companyId } = req.body 
      
      const company = await Company.findById(companyId);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      res.status(200).json({ company: company })
    } catch (error) {
      res.status(500).json({ error: error });
    }
}

export const getCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await Company.find();

        if (!companies) {
            return res.status(404).json({ message: 'companies not found'})
        }

        res.status(201).json({ companies })
    } catch (error) {
        res.status(500).json({ error: error})
    }
}
