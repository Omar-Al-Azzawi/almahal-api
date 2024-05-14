import { NextFunction, Request, Response } from 'express';
import Shop from '../models/Shop';
import Product from '../models/Product';
import Warehouse from '../models/warehouse'

export const createShop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const owner = (req as any).user.userId;

    const shop = new Shop({ name, owner });
    await shop.save();

    res.status(201).json({ message: 'Shop created successfully', shop });
  } catch (error) {
    next(error)
  }
};

export const addProductToShop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, shopId } = req.body;

    const product = await Product.findById(productId);
    const shop = await Shop.findById(shopId);

    if (!product || !shop) {
      return res.status(404).json({ message: 'Product or shop not found' });
    }

    const warehouse = await Warehouse.findOne({ products: product._id });
    if (warehouse) {
       warehouse.products = warehouse.products.filter(p => p.toString() !== product._id.toString());
       await warehouse.save();
    }

    if (!shop.products.includes(product._id)) {
      shop.products.push(product._id);
      await shop.save();
    }

    res.status(200).json({ message: 'Product added to shop successfully', product, shop });
  } catch (error) {
    next(error)
  }
};

export const getShopProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId).populate('products');

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json({ products: shop.products });
  } catch (error) {
    next(error)
  }
};
