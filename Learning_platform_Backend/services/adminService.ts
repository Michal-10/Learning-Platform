import User from "../models/User";

export const getAllUsersService = async () => {
  return await User.find();
};