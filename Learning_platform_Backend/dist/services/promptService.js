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
exports.getPrompts = exports.createPrompt = void 0;
const Prompt_1 = __importDefault(require("../models/Prompt"));
const createPrompt = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt, categoryId, subCategoryId } = data;
    if (!prompt || !categoryId || !subCategoryId) {
        throw new Error('All fields are required');
    }
    const newPrompt = new Prompt_1.default({ prompt, categoryId, subCategoryId, userId });
    return yield newPrompt.save();
});
exports.createPrompt = createPrompt;
const getPrompts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Prompt_1.default.find({ userId });
});
exports.getPrompts = getPrompts;
