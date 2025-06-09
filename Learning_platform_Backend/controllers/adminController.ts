import { Request, Response } from 'express';
import Prompt from '../models/Prompt';

export const getAllPromptsWithNames = async (req: Request, res: Response): Promise<void> => {
  try {
    const prompts = await Prompt.find()
      .populate('user_id', 'name' )  
      .populate('category_id', 'name' )         // שליפת שם הקטגוריה
      .populate('sub_category_id', 'name');     // שליפת שם תת־הקטגוריה
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשרת', error });
  }
};
