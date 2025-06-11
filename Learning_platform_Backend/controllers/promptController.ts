import { Request, Response } from 'express';
import Prompt from '../models/Prompt';
import { getAIResponse } from '../services/openaiService';

export async function createPrompt(req: Request, res: Response) {
  try {
console.log("in createPrompt");

    const { category_id, sub_category_id, prompt } = req.body;

    // מקבל את המשתמש מהטוקן (דרך המידלוור)
    const user = (req as any).user;

    if (!user || !category_id || !sub_category_id || !prompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const aiResponse = await getAIResponse(prompt);

    const newPrompt = new Prompt({
      user_id: user.id,
      category_id,
      sub_category_id,
      prompt,
      response: aiResponse,
    });

    await newPrompt.save();
    res.status(201).json(aiResponse);
  } catch (error) {
    console.error('Create Prompt Error:', error);
    res.status(500).json({ error: 'Failed to create prompt' });
  }
}

export async function getUserPrompts(req: Request, res: Response) {
  try {    // מקבל את המשתמש מהטוקן (דרך middlewaere)
    const user = (req as any).user;
    const prompts = await Prompt.find({ user_id: user.id }).populate('category_id sub_category_id');
    
    res.json(prompts);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch prompts',
  });
  }
}
