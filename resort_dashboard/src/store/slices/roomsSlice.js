import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchRooms = createAsyncThunk('rooms/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE}/rooms`, { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch rooms');
  }
});

export const createRoom = createAsyncThunk('rooms/create', async (roomData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_BASE}/rooms`, roomData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create room');
  }
});

export const updateRoom = createAsyncThunk('rooms/update', async ({ id, ...roomData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_BASE}/rooms/${id}`, roomData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update room');
  }
});

export const deleteRoom = createAsyncThunk('rooms/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE}/rooms/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete room');
  }
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: { items: [], loading: false, error: null },
  reducers: { clearError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRooms.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchRooms.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createRoom.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const idx = state.items.findIndex(r => r._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.items = state.items.filter(r => r._id !== action.payload);
      });
  },
});

// export const { clearError } = roomsSlice.actions;
export default roomsSlice.reducer;
