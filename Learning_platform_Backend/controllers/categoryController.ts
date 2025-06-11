import { Request, Response } from 'express';
import { createCategoryService, getAllCategoriesService } from '../services/category';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });

    const category = await createCategoryService(name);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create category' });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
