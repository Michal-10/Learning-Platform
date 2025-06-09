import Category from '../models/Category';

export const createCategoryService = async (name: string) => {
  const exists = await Category.findOne({ name });
  if (exists) throw new Error('Category already exists');

  const newCategory = new Category({ name });
  return await newCategory.save();
};

export const getAllCategoriesService = async () => {
  return await Category.find();
};
