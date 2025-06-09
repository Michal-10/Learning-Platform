
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from '../models/User';

interface UserState {
  user: User;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {} as User,
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { phone: string, name:string }, thunkAPI) => {
    try {
      console.log(import.meta.env.VITE_API_URL);  
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, credentials);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (credentials: { name: string; phone: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, credentials);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {} as User;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("loginUser.fulfilled,");
        console.log(action.payload.user);
        console.log("loginUser.fulfilled,");
        console.log("action.payload.token;");
        console.log(action.payload.token);
        console.log("action.payload.token;");
        
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
