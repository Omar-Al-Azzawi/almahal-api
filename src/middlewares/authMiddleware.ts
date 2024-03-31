import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Access denied. Invalid token' });
  }
};
