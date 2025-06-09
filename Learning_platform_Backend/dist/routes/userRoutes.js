"use strict";
// import express from 'express';
// import User from '../models/User';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.post('/register', async (req, res) => {
//   try {
//     const { email, phone, name } = req.body;
//     if (!email || !phone || !name) 
//       return res.status(400).json({ error: 'Name and phone required' });
//     const user = new User({ email, phone, name });
//     await user.save();
//     res.status(201).json(user);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });
// router.post('/login', async (req, res) => {
//   try {
//     const {email, phone } = req.body;
//     if (!phone || !email) 
//       return res.status(400).json({ error: 'Phone required' });
//     const user = await User.findOne({ email, phone });
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.status(200).json(user);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });
// export default router;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/user/register', userController_1.registerUser);
router.post('/user/login', userController_1.loginUser);
router.get('/', userController_1.getUsers);
exports.default = router;
