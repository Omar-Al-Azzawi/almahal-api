import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  const tokenBearer = token.split(' ');
  if (tokenBearer.length !== 2 || tokenBearer[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
  }

  const authToken = tokenBearer[1];
  const JWT_SECRET = process.env.JWT_SECRET as string

  jwt.verify(authToken, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Unauthorized: Token expired' });
      }
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
};
