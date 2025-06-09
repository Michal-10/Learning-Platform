"use strict";
// import express from 'express';
// import SubCategory from '../models/SubCategory';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const subCategoryController_1 = require("../controllers/subCategoryController");
const router = express_1.default.Router();
// יצירת תת־קטגוריה
router.post('/', subCategoryController_1.createSubCategory);
// שליפת כל תתי־הקטגוריות
router.get('/', subCategoryController_1.getAllSubCategories);
// שליפת תתי־קטגוריות לפי מזהה קטגוריה
router.get('/category/:categoryId', subCategoryController_1.getSubCategoriesByCategory);
exports.default = router;
