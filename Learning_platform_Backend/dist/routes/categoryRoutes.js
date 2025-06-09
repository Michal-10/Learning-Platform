"use strict";
// import express from 'express';
// import Category from '../models/Category';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
// יצירת קטגוריה
router.post('/', categoryController_1.createCategory);
// שליפת קטגוריות
router.get('/', categoryController_1.getAllCategories);
exports.default = router;
