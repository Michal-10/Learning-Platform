// // controllers/categoryController.ts

// import { Request, Response } from 'express';
// import Category from '../models/Category';

// export const getAllCategories = async (req: Request, res: Response) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch categories' });
//   }
// };

// export const createCategory = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.body;
//     const newCategory = new Category({ name });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to create category' });
//   }
// };



import { Request, Response } from 'express';
import Category from '../models/Category';

// יצירת קטגוריה חדשה
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Name required' });
      return;
    }

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// שליפת כל הקטגוריות
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
