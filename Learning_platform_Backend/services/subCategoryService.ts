import SubCategory from '../models/SubCategory';

export const createSubCategoryService = async (name: string, category_id: string) => {
  const newSubCategory = new SubCategory({ name, category_id });
  return await newSubCategory.save();
};

export const getAllSubCategoriesService = async () => {
  return await SubCategory.find().populate('category_id');
};

export const getSubCategoriesByCategoryService = async (categoryId: string) => {
  return await SubCategory.find({ category_id: categoryId });
};
