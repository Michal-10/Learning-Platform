
import { Request, Response } from 'express';
import * as authService from '../services/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    console.log('User registered successfully:', result);
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
