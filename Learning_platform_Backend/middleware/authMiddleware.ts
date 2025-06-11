
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth Middleware Triggered");
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  
  
  
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);
  

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Extracted Token:", token);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    (req as any).user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
