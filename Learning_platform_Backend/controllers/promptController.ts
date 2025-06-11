import { Request, Response } from 'express';
import Prompt from '../models/Prompt';
import { getAIResponse } from '../services/openaiService';
import mongoose from 'mongoose';

export async function createPrompt(req: Request, res: Response) {
  try {

    const { category_id, sub_category_id, prompt } = req.body;

    // מקבל את המשתמש מהטוקן (דרך המידלוור)
    const userId = (req as any).user.id;
    console.log("User from token:", userId);
    console.log("Request Body:", req.body);
    
    
    

    if (!userId || !category_id || !sub_category_id || !prompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const aiResponse = await getAIResponse(prompt);

    const newPrompt = new Prompt({
      user_id: new mongoose.Types.ObjectId(userId.toString()), // Convert userId to ObjectId
      category_id,
      sub_category_id,
      prompt,
      response: aiResponse,
    });
console.log("New Prompt Object:", newPrompt);
console.log(newPrompt.user_id);

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
