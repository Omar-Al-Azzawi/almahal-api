import { Request, Response } from 'express';
import Product from '../models/Product';
import User from '../models/User';

// CREATE - Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, type, quantity, length, manufacture, price, createdBy, updatedBy } = req.body;

    if (!createdBy) {
      return res.status(400).json({ message: 'Created By ID is required' });
    }

    const product = new Product({ name, description, type, quantity, length, manufacture, price, createdBy, updatedBy });
    await product.save();

    const user = await User.findById(createdBy);

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

// READ - Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const ownerId = req.body.ownerId;
    const products = await Product.find({ ownerId });

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// READ - Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// UPDATE - Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// DELETE - Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
