// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// interface AuthState {
//   userId: string | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   loading: boolean;
//   error: string | null;
// }

// interface LoginPayload {
//   username: string;
//   password: string;
// }
// interface RegisterPayload {
//     name: string;
//     phone: string;
//     password: string;
//   }
  

// const initialState: AuthState = {
//   userId: null,
//   token: null,
//   isAuthenticated: false,
//   isAdmin: false,
//   loading: false,
//   error: null,
// };

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (payload: LoginPayload, { rejectWithValue }) => {
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) {
//         throw new Error("Login failed");
//       }
//       return await res.json();
//     } catch (err) {
//       return rejectWithValue("שם משתמש או סיסמה שגויים");
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//     "auth/registerUser",
//     async (payload: RegisterPayload, { rejectWithValue }) => {
//       try {
//         const res = await fetch("/api/auth/register", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//         if (!res.ok) {
//           throw new Error("Registration failed");
//         }
//         return await res.json();
//       } catch (err) {
//         return rejectWithValue("הרשמה נכשלה. נסה שוב");
//       }
//     }
//   );
// export const logoutUser = () => (dispatch: any) => {
//   dispatch(authSlice.actions.logout());
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.userId = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.isAdmin = false;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userId = action.payload.userId;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.isAdmin = action.payload.isAdmin ?? false;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userId = action.payload.userId;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.isAdmin = action.payload.isAdmin ?? false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
      
//   },
// });

// export default authSlice.reducer;


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
