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
exports.getAllUsers = exports.getAllPromptsWithNames = void 0;
const Prompt_1 = __importDefault(require("../models/Prompt"));
const adminService_1 = require("../services/adminService");
const getAllPromptsWithNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompts = yield Prompt_1.default.find()
            .populate('user_id', 'name')
            .populate('category_id', 'name') // שליפת שם הקטגוריה
            .populate('sub_category_id', 'name'); // שליפת שם תת־הקטגוריה
        res.status(200).json(prompts);
    }
    catch (error) {
        res.status(500).json({ message: 'שגיאה בשרת', error });
    }
});
exports.getAllPromptsWithNames = getAllPromptsWithNames;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, adminService_1.getAllUsersService)();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
exports.getAllUsers = getAllUsers;
