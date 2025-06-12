"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubCategoriesByCategory = exports.getAllSubCategories = exports.createSubCategory = void 0;
const subCategoryService_1 = require("../services/subCategoryService");
const createSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category_id } = req.body;
        if (!name || !category_id)
            return res.status(400).json({ error: 'Name and category_id required' });
        const subCategory = yield (0, subCategoryService_1.createSubCategoryService)(name, category_id);
        res.status(201).json(subCategory);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create sub-category' });
    }
});
exports.createSubCategory = createSubCategory;
const getAllSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategories = yield (0, subCategoryService_1.getAllSubCategoriesService)();
        res.status(200).json(subCategories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch sub-categories' });
    }
});
exports.getAllSubCategories = getAllSubCategories;
const getSubCategoriesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const subCategories = yield (0, subCategoryService_1.getSubCategoriesByCategoryService)(categoryId);
        res.status(200).json(subCategories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch sub-categories by category' });
    }
});
exports.getSubCategoriesByCategory = getSubCategoriesByCategory;
