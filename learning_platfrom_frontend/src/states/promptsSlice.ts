
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Prompt } from '../models/Prompt';
import type { RootState } from './store';

interface PromptState {
    prompts: Prompt[];
    loading: boolean;
    error: string | null;
}

const initialState: PromptState = {
    prompts: [],
    loading: false,
    error: null,
};

export const sendPrompt = createAsyncThunk(
    'prompt/sendPrompt',
    async (
        data: { prompt: string; category_id: string; sub_category_id: string },
        thunkAPI
    ) => {
        const state = thunkAPI.getState() as RootState;
        const token = state.auth.token;
        console.log("in sendPrompt thunk");
        console.log(token);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/prompts/create`, data
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const fetchPromptHistory = createAsyncThunk(
    'prompt/fetchHistory',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const token = state.auth.token;
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/prompts/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getAllPrompts = createAsyncThunk(
    'prompt/fetchPrompts',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const promptSlice = createSlice({
    name: 'prompt',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendPrompt.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendPrompt.fulfilled, (state, action) => {
                state.loading = false;
                state.prompts.push(action.payload);
            })
            .addCase(sendPrompt.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPromptHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPromptHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.prompts = action.payload;
            })
            .addCase(fetchPromptHistory.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllPrompts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPrompts.fulfilled, (state, action) => {
                state.loading = false;
                state.prompts = action.payload;
            })
            .addCase(getAllPrompts.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export default promptSlice.reducer;