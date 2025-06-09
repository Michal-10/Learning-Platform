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
// export async function createPrompt(req: Request, res: Response) {
//   try {
//     const { user_id, category_id, sub_category_id, prompt } = req.body;
//     if (!user_id || !category_id || !sub_category_id || !prompt) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }
//     const aiResponse = await getAIResponse(prompt);
//     const newPrompt = new Prompt({
//       user_id,
//       category_id,
//       sub_category_id,
//       prompt,
//       response: aiResponse,
//     });
//     await newPrompt.save();
//     res.status(201).json(newPrompt);
//   } catch (error) {
//     console.error('Create Prompt Error:', error);
//     res.status(500).json({ 
//       // error: 'Server error' 
//       error: 'Failed to create prompt',
//     });
//   }
// }
function createPrompt(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("createPrompt");
            const { category_id, sub_category_id, prompt } = req.body;
            // מקבל את המשתמש מהטוקן (דרך המידלוור)
            const user = req.user;
            if (!user || !category_id || !sub_category_id || !prompt) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            const aiResponse = yield (0, openaiService_1.getAIResponse)(prompt);
            console.log("aiResponse");
            console.log(aiResponse);
            const newPrompt = new Prompt_1.default({
                user_id: user.id,
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
        try { // מקבל את המשתמש מהטוקן (דרך המידלוור)
            const user = req.user;
            console.log("userId");
            console.log(user.id);
            const prompts = yield Prompt_1.default.find({ user_id: user.id }).populate('category_id sub_category_id');
            console.log("prompts");
            console.log(prompts);
            res.json(prompts);
        }
        catch (error) {
            res.status(500).json({
                //error: 'Server error' 
                error: 'Failed to fetch prompts',
            });
        }
    });
}
