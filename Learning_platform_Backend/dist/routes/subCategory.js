"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategoryController_1 = require("../controllers/subCategoryController");
const router = express_1.default.Router();
router.post('/', subCategoryController_1.createSubCategory);
router.get('/', subCategoryController_1.getAllSubCategories);
router.get('/category/:categoryId', subCategoryController_1.getSubCategoriesByCategory);
exports.default = router;
