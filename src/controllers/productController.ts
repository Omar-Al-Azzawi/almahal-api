import { NextFunction, Request, Response } from 'express';
import Product from '../models/Product';
import User from '../models/User';
import Note from '../models/Note';
import dotenv from 'dotenv'

//import { S3Client, PutObjectAclCommand } from '@aws-sdk/client-s3';

dotenv.config()

// const bucketName = process.env.BUCKET_NAME
// const bucketRegion = process.env.BUCKET_REGION
// const accessKey = process.env.ACCESS_KEY
// const secretAccessKey = process.env.SECRET_ACCESS_KEY

// const s3 = new S3Client({ 
//   region: bucketRegion, 
//   credentials: { 
//     accessKeyId: accessKey as string, 
//     secretAccessKey: secretAccessKey  as string
//   }
// });

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdBy = (req as any).user.userId
    const { name, description, type, quantity, length, manufacture, price } = req.body;

    if (!createdBy) {
      return res.status(400).json({ message: 'Created By ID is required' });
    }

    // const params = {
    //   Bucket: bucketName,
    //   Key: `${Date.now()}-${req.file?.originalname}`,
    //   Body: req.file?.buffer,
    //   ContentType: req.file?.mimetype
    // }

    // const command = new PutObjectAclCommand(params)

    // await s3.send(command)

    const product = new Product({ name, description, type, quantity, length, manufacture, price, createdBy });
    await product.save();

    const user = await User.findById(createdBy);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.products.push(product._id);
    await user.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    next(error)
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    next(error)
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error)
  }
};

export const getProductsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;

    const products = await Product.find({ createdBy: userId });

    res.status(200).json({ products });
  } catch (error) {
    next(error)
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    next(error)
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error)
  }
};

export const addNoteToProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, type, title, content } = req.body;
    const userId = (req as any).user.userId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const note = new Note({
      type,
      title,
      content,
      owner: userId
    });

    await note.save();

    product.notes.push(note._id);
    await product.save();res.status(201).json({ message: 'Note added to product successfully', note });
  } catch (error) {
    next(error)
  }
}

export const getProductNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId).populate('notes');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const notes = product.notes;

    res.status(200).json({ notes });
  } catch (error) {
    next(error)
  }
}
