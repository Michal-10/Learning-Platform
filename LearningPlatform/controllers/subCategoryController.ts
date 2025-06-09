// // // controllers/subCategoryController.ts

// // import { Request, Response } from 'express';
// // import SubCategory from '../models/SubCategory';

// // export const getSubCategoriesByCategory = async (req: Request, res: Response) => {
// //   try {
// //     const { categoryId } = req.params;
// //     const subCategories = await SubCategory.find({ category_id: categoryId });
// //     res.json(subCategories);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to fetch sub-categories' });
// //   }
// // };

// // export const createSubCategory = async (req: Request, res: Response) => {
// //   try {
// //     const { name, category_id } = req.body;
// //     const newSubCategory = new SubCategory({ name, category_id });
// //     await newSubCategory.save();
// //     res.status(201).json(newSubCategory);
// //   } catch (error) {
// //     res.status(400).json({ error: 'Failed to create sub-category' });
// //   }
// // };




// import { Request, Response } from 'express';
// import SubCategory from '../models/SubCategory';

// // יצירת תת־קטגוריה
// export const createSubCategory = async (req: Request, res: Response): Promise<void> => {
//   try {

//     const { name, category_id } = req.body;

//     if (!name || !category_id) {
//       res.status(400).json({ error: 'Name and category_id required' });
//       return;
//     }

//     const newSubCategory = new SubCategory({ name, category_id });
//     await newSubCategory.save();
//     res.status(201).json(newSubCategory);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create sub-category' });
//   }
// };

// // שליפת כל תתי־הקטגוריות (כולל קטגוריה משויכת)
// export const getAllSubCategories = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const subCategories = await SubCategory.find().populate('category_id');
//     res.status(200).json(subCategories);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch sub-categories' });
//   }
// };

// // שליפת תתי־קטגוריות לפי קטגוריה
// export const getSubCategoriesByCategory = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { categoryId } = req.params;
//     const subCategories = await SubCategory.find({ category_id: categoryId });
//     res.status(200).json(subCategories);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch sub-categories by category' });
//   }
// };


import { Request, Response } from 'express';
import {
  createSubCategoryService,
  getAllSubCategoriesService,
  getSubCategoriesByCategoryService
} from '../services/subCategory';

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
