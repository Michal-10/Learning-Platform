import express from 'express';
import { getAllPromptsWithNames, getAllUsers } from '../controllers/adminController';

const router = express.Router();

router.get('/dashboard', getAllPromptsWithNames );
router.get('/users', getAllUsers );////////////////////////צור לי פונקציה שתביא לי את כל המשתמשים עם כל הפרומפטים שלהם
//////  להחזיר את כל המשתמשים

export default router;
