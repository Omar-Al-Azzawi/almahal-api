import { Request, Response } from 'express';
import Product from '../models/Product';
import User from '../models/User';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, owner } = req.body;

    if (!owner) {
      return res.status(400).json({ message: 'Owner ID is required' });
    }

    const product = new Product({ name, description, price, owner });
    await product.save();

    const user = await User.findById(owner);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.products.push(product._id);
    await user.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUserProducts = async (req: Request, res: Response) => {
  try {
    const ownerId = req.body.ownerId;
    const products = await Product.find({ ownerId });

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

