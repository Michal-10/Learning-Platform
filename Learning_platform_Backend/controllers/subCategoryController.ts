
import { Request, Response } from 'express';
import {
  createSubCategoryService,
  getAllSubCategoriesService,
  getSubCategoriesByCategoryService
} from '../services/subCategoryService';

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, category_id } = req.body;
    if (!name || !category_id)
      return res.status(400).json({ error: 'Name and category_id required' });

    const subCategory = await createSubCategoryService(name, category_id);
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sub-category' });
  }
};

export const getAllSubCategories = async (req: Request, res: Response) => {
  try {
    const subCategories = await getAllSubCategoriesService();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sub-categories' });
  }
};

export const getSubCategoriesByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await getSubCategoriesByCategoryService(categoryId);
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sub-categories by category' });
  }
};
