// import express from 'express';
// import Category from '../models/Category';

// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!name) return res.status(400).json({ error: 'Name required' });
//     const category = new Category({ name });
//     await category.save();
//     res.status(201).json(category);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;


import express from 'express';
import { createCategory, getAllCategories } from '../controllers/categoryController';

const router = express.Router();

// יצירת קטגוריה
router.post('/', createCategory);

// שליפת קטגוריות
router.get('/', getAllCategories);

export default router;
