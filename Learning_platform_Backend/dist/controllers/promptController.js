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
exports.createPrompt = createPrompt;
exports.getUserPrompts = getUserPrompts;
const Prompt_1 = __importDefault(require("../models/Prompt"));
const openaiService_1 = require("../services/openaiService");
const mongoose_1 = __importDefault(require("mongoose"));
function createPrompt(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category_id, sub_category_id, prompt } = req.body;
            // מקבל את המשתמש מהטוקן (דרך המידלוור)
            const userId = req.user.id;
            if (!userId || !category_id || !sub_category_id || !prompt) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            const aiResponse = yield (0, openaiService_1.getAIResponse)(prompt);
            const newPrompt = new Prompt_1.default({
                user_id: new mongoose_1.default.Types.ObjectId(userId.toString()), // Convert userId to ObjectId
                category_id,
                sub_category_id,
                prompt,
                response: aiResponse,
            });
            yield newPrompt.save();
            res.status(201).json(aiResponse);
        }
        catch (error) {
            console.error('Create Prompt Error:', error);
            res.status(500).json({ error: 'Failed to create prompt' });
        }
    });
}
function getUserPrompts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try { // מקבל את המשתמש מהטוקן (דרך middlewaere)
            const user = req.user;
            const prompts = yield Prompt_1.default.find({ user_id: user.id }).populate('category_id sub_category_id');
            res.json(prompts);
        }
        catch (error) {
            res.status(500).json({
                error: 'Failed to fetch prompts',
            });
        }
    });
}
