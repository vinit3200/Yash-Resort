import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const fetchBookings = createAsyncThunk('bookings/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/bookings', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch bookings');
  }
});

export const fetchAvailability = createAsyncThunk('bookings/fetchAvailability', async ({ resortId, roomType }, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/availability', { params: { resortId, roomType } });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch availability');
  }
});

export const createBooking = createAsyncThunk('bookings/create', async (bookingData, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/bookings', bookingData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create booking');
  }
});

export const updateBooking = createAsyncThunk('bookings/update', async ({ id, ...bookingData }, { rejectWithValue }) => {
  try {
    const { data } = await API.put(`/bookings/${id}`, bookingData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update booking');
  }
});

export const deleteBooking = createAsyncThunk('bookings/delete', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/bookings/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete booking');
  }
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: { items: [], loading: false, error: null },
  reducers: { clearError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBookings.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchBookings.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createBooking.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(createBooking.rejected, (state, action) => { state.error = action.payload; })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const idx = state.items.findIndex(b => b._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.items = state.items.filter(b => b._id !== action.payload);
      });
  },
});

export const { clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer;
