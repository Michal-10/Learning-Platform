import express from 'express';
import { getAllPromptsWithNames, getAllUsers } from '../controllers/adminController';

const router = express.Router();

router.get('/dashboard', getAllPromptsWithNames );
router.get('/users', getAllUsers );

export default router;
