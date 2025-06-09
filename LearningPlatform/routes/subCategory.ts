// import express from 'express';
// import SubCategory from '../models/SubCategory';


// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { name, category_id } = req.body;
//     if (!name || !category_id) return res.status(400).json({ error: 'Name and category_id required' });
//     const subCategory = new SubCategory({ name, category_id });
//     await subCategory.save();
//     res.status(201).json(subCategory);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const subCategories = await SubCategory.find().populate('category_id');
//     res.json(subCategories);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;



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
