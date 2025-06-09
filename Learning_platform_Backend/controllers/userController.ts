// import { Request, Response } from 'express';
// import User, { IUser } from '../models/User';
// import jwt from 'jsonwebtoken';

// const generateToken = (userId: string): string => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
//     expiresIn: '1h',
//   });
// };

// export const registerUser = async (req: Request, res: Response): Promise<void> => {
//   const { name, phone } = req.body;
//   try {
//     if (!name || !phone ) {
//       res.status(400).json({ message: 'Name, phone, and email are required' });
//       return;
//     }

//     const userExists = await User.findOne({ phone });
//     if (userExists) {
//       res.status(400).json({ message: 'User already exists' });
//       return;
//     }

//     const user: IUser = new User({ name, phone });
//     await user.save();
//     const token = generateToken((user as IUser)._id.toString());

//     res.status(200).json({
//       user,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   console.log("in login user");
  
//   const { name, phone  } = req.body;
// console.log("name  "+name+"  phone  "+phone);

//   try {
//     if (!phone || !name) {
//       res.status(400).json({ message: 'Phone and email are required' });
//       return;
//     }
// console.log("before findOne");
// console.log(User);

//     const user = await User.findOne({ phone, name });
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
//     const token = generateToken((user as IUser)._id.toString());

//     res.status(200).json({
//       user,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getUsers = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import { Request, Response } from 'express';
import * as authService from '../services/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
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
