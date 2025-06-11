import express from 'express';
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory
} from '../controllers/subCategoryController';

const router = express.Router();

router.post('/', createSubCategory);
router.get('/', getAllSubCategories);
router.get('/category/:categoryId', getSubCategoriesByCategory);

export default router;
