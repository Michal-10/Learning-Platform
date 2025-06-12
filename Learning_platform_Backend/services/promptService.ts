import Prompt from "../models/Prompt";

export const createPrompt = async (userId: string, data: any) => {
  const { prompt, categoryId, subCategoryId } = data;

  if (!prompt || !categoryId || !subCategoryId) {
    throw new Error('All fields are required');
  }

  const newPrompt = new Prompt({ prompt, categoryId, subCategoryId, userId });
  return await newPrompt.save();
};

export const getPrompts = async (userId: string) => {
  return await Prompt.find({ userId });
};
