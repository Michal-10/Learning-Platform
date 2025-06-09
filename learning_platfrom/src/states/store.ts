import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import promptsReducer from "./promptsSlice";
import userReducer from './userSlice'
import categoryReducer from './categoriesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    prompts: promptsReducer,
    users: userReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

