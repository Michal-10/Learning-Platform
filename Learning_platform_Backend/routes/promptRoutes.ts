import express from 'express';
import { createPrompt, getUserPrompts } from '../controllers/promptController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, createPrompt);
router.get('/user', authMiddleware, getUserPrompts);

export default router;