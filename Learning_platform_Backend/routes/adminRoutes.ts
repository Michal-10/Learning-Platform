import express from 'express';
import { getAllPromptsWithNames } from '../controllers/adminController';

const router = express.Router();

router.get('/dashboard', getAllPromptsWithNames );

export default router;
