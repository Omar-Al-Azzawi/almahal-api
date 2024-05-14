import { NextFunction, Request, Response } from 'express';
import Warehouse from '../models/warehouse';
import Product from '../models/Product';
import Shop from '../models/Shop'

export const createWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const { name } = req.body;
       const owner = (req as any).user.userId;

       const shop = new Warehouse({ name, owner });
       await shop.save();

       res.status(201).json({ message: 'Warehouse created successfully', shop });
    } catch (error) {
        next(error)
    }
}

export const addProductToWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, warehouseId } = req.body;

        const product = await Product.findById(productId);
        const warehouse = await Warehouse.findById(warehouseId)

        if (!product || !warehouse) {
          return res.status(404).json({ message: 'Product or warehouse not found' });
        }

        const shop = await Shop.findOne({ products: product._id });
        if (shop) {
            shop.products = shop.products.filter(p => p.toString() !== product._id.toString());
            await shop.save();
        }

        if (!warehouse.products.includes(product._id)) {
            warehouse.products.push(product._id);
            await warehouse.save();
        }

        res.status(200).json({ message: 'Product added to warehouse successfully', product, warehouse });
    } catch (error) {
        next(error)
    }
}

export const getWarehouseProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { warehouseId } = req.params;
    
        const warehouse = await Warehouse.findById(warehouseId).populate('products');
    
        if (!warehouse) {
          return res.status(404).json({ message: 'Warehouse not found' });
        }
    
        res.status(200).json({ products: warehouse.products });
      } catch (error) {
        next(error)
      }
}
