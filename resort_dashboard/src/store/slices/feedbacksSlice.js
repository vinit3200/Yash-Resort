import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchFeedbacks = createAsyncThunk('feedbacks/fetchFeedbacks', async () => {
  const response = await axios.get(`${API_BASE}/feedbacks`);
  return response.data;
});

export const deleteFeedback = createAsyncThunk('feedbacks/deleteFeedback', async (id) => {
  await axios.delete(`${API_BASE}/feedbacks/${id}`);
  return id;
});

const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => { state.loading = true; })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default feedbacksSlice.reducer;
