import { Request, Response } from 'express';
import Shop from '../models/Shop';
import Product from '../models/Product';

export const createShop = async (req: Request, res: Response) => {
  try {
    const { name, owner } = req.body;

    const shop = new Shop({ name, owner });
    await shop.save();

    res.status(201).json({ message: 'Shop created successfully', shop });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const addProductToShop = async (req: Request, res: Response) => {
  try {
    const { productId, shopId } = req.body;

    const product = await Product.findById(productId);
    const shop = await Shop.findById(shopId);

    if (!product || !shop) {
      return res.status(404).json({ message: 'Product or shop not found' });
    }

    shop.products.push(product._id);
    await shop.save();

    res.status(200).json({ message: 'Product added to shop successfully', product, shop });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getShopProducts = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId).populate('products');

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json({ products: shop.products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
