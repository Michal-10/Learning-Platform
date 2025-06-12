import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const register = async (data: any) => {
  const { name, phone } = data;

  if (!name || !phone) {
    throw new Error('All fields are required');
  }

  const existingUser = await User.findOne({ name });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = new User({ name, phone });
  await newUser.save();
  
  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1d' });
  return { token,newUser };
};

export const login = async (data: any) => {
  const { name, phone } = data;

  if (!name || !phone) {
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ name , phone });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
  return { token, user };
};
