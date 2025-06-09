"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promptController_1 = require("../controllers/promptController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/create', authMiddleware_1.authMiddleware, promptController_1.createPrompt);
router.get('/user', authMiddleware_1.authMiddleware, promptController_1.getUserPrompts);
exports.default = router;
