"use strict";
// // controllers/categoryController.ts
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
exports.getAllCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
// יצירת קטגוריה חדשה
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name required' });
            return;
        }
        const newCategory = new Category_1.default({ name });
        yield newCategory.save();
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});
exports.createCategory = createCategory;
// שליפת כל הקטגוריות
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
exports.getAllCategories = getAllCategories;
