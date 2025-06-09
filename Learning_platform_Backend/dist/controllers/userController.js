"use strict";
// import { Request, Response } from 'express';
// import User, { IUser } from '../models/User';
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
exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone } = req.body;
    try {
        if (!name || !phone) {
            res.status(400).json({ message: 'Name, phone, and email are required' });
            return;
        }
        const userExists = yield User_1.default.findOne({ phone });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const user = new User_1.default({ name, phone });
        yield user.save();
        const token = generateToken(user._id.toString());
        res.status(200).json({
            user,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in login user");
    const { name, phone } = req.body;
    console.log("name  " + name + "  phone  " + phone);
    try {
        if (!phone || !name) {
            res.status(400).json({ message: 'Phone and email are required' });
            return;
        }
        console.log("before findOne");
        console.log(User_1.default);
        const user = yield User_1.default.findOne({ phone, name });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const token = generateToken(user._id.toString());
        res.status(200).json({
            user,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getUsers = getUsers;
