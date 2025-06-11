
import OpenAI from 'openai';

import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, 
});

export async function getAIResponse(prompt: string): Promise<string> {
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo', 
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 500,
  });

  return response.choices[0].message.content || '';
}