import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string) {
  if (password.length < 8) {
      return "Password must be at least 8 characters long.";
  }
  if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
  }
  if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
  }
  if (!/\d/.test(password)) {
      return "Password must contain at least one digit.";
  }
  if (!/[@#$%^&+=]/.test(password)) {
      return "Password must contain at least one special character (@#$%^&+=).";
  }

  return null;
}


export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET as string
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
