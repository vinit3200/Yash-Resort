import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const fetchEvents = createAsyncThunk('events/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/events', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch events');
  }
});

export const createEvent = createAsyncThunk('events/create', async (eventData, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/events', eventData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create event');
  }
});

export const updateEvent = createAsyncThunk('events/update', async ({ id, ...eventData }, { rejectWithValue }) => {
  try {
    const { data } = await API.put(`/events/${id}`, eventData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update event');
  }
});

export const deleteEvent = createAsyncThunk('events/delete', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/events/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete event');
  }
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: { items: [], loading: false, error: null },
  reducers: { clearError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEvents.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchEvents.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createEvent.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const idx = state.items.findIndex(e => e._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e._id !== action.payload);
      });
  },
});

export const { clearError } = eventsSlice.actions;
export default eventsSlice.reducer;
