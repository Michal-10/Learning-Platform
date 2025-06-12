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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubCategoriesByCategoryService = exports.getAllSubCategoriesService = exports.createSubCategoryService = void 0;
const SubCategory_1 = __importDefault(require("../models/SubCategory"));
const createSubCategoryService = (name, category_id) => __awaiter(void 0, void 0, void 0, function* () {
    const newSubCategory = new SubCategory_1.default({ name, category_id });
    return yield newSubCategory.save();
});
exports.createSubCategoryService = createSubCategoryService;
const getAllSubCategoriesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield SubCategory_1.default.find().populate('category_id');
});
exports.getAllSubCategoriesService = getAllSubCategoriesService;
const getSubCategoriesByCategoryService = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SubCategory_1.default.find({ category_id: categoryId });
});
exports.getSubCategoriesByCategoryService = getSubCategoriesByCategoryService;
