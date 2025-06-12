"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.get('/dashboard', adminController_1.getAllPromptsWithNames);
router.get('/users', adminController_1.getAllUsers); ////////////////////////צור לי פונקציה שתביא לי את כל המשתמשים עם כל הפרומפטים שלהם
//////  להחזיר את כל המשתמשים
exports.default = router;
