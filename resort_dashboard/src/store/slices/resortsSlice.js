import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchResorts = createAsyncThunk('resorts/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE}/resorts`, { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch resorts');
  }
});

export const createResort = createAsyncThunk('resorts/create', async (resortData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_BASE}/resorts`, resortData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create resort');
  }
});

export const updateResort = createAsyncThunk('resorts/update', async ({ id, ...resortData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_BASE}/resorts/${id}`, resortData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update resort');
  }
});

export const deleteResort = createAsyncThunk('resorts/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE}/resorts/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete resort');
  }
});

const resortsSlice = createSlice({
  name: 'resorts',
  initialState: { items: [], loading: false, error: null },
  reducers: { clearError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResorts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchResorts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchResorts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createResort.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateResort.fulfilled, (state, action) => {
        const idx = state.items.findIndex(r => r._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteResort.fulfilled, (state, action) => {
        state.items = state.items.filter(r => r._id !== action.payload);
      });
  },
});

// export const { clearError } = resortsSlice.actions;
export default resortsSlice.reducer;
