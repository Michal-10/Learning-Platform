"use strict";
// // controllers/subCategoryController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubCategoriesByCategory = exports.getAllSubCategories = exports.createSubCategory = void 0;
const SubCategory_1 = __importDefault(require("../models/SubCategory"));
// יצירת תת־קטגוריה
const createSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category_id } = req.body;
        if (!name || !category_id) {
            res.status(400).json({ error: 'Name and category_id required' });
            return;
        }
        const newSubCategory = new SubCategory_1.default({ name, category_id });
        yield newSubCategory.save();
        res.status(201).json(newSubCategory);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create sub-category' });
    }
});
exports.createSubCategory = createSubCategory;
// שליפת כל תתי־הקטגוריות (כולל קטגוריה משויכת)
const getAllSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategories = yield SubCategory_1.default.find().populate('category_id');
        res.status(200).json(subCategories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch sub-categories' });
    }
});
exports.getAllSubCategories = getAllSubCategories;
// שליפת תתי־קטגוריות לפי קטגוריה
const getSubCategoriesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const subCategories = yield SubCategory_1.default.find({ category_id: categoryId });
        res.status(200).json(subCategories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch sub-categories by category' });
    }
});
exports.getSubCategoriesByCategory = getSubCategoriesByCategory;
