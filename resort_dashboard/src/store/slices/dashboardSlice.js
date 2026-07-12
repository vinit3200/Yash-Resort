import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchDashboard = createAsyncThunk('dashboard/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE}/dashboard/stats`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch dashboard');
  }
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: null,
    monthlyRevenue: [],
    recentBookings: [],
    upcomingEvents: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.monthlyRevenue = action.payload.monthlyRevenue;
        state.recentBookings = action.payload.recentBookings;
        state.upcomingEvents = action.payload.upcomingEvents;
      })
      .addCase(fetchDashboard.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default dashboardSlice.reducer;
