import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const fetchCustomers = createAsyncThunk('customers/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/customers', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch customers');
  }
});

export const fetchCustomerDetail = createAsyncThunk('customers/fetchOne', async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/customers/${id}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch customer');
  }
});

export const createCustomer = createAsyncThunk('customers/create', async (customerData, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/customers', customerData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create customer');
  }
});

export const updateCustomer = createAsyncThunk('customers/update', async ({ id, ...customerData }, { rejectWithValue }) => {
  try {
    const { data } = await API.put(`/customers/${id}`, customerData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update customer');
  }
});

export const deleteCustomer = createAsyncThunk('customers/delete', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/customers/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete customer');
  }
});

const customersSlice = createSlice({
  name: 'customers',
  initialState: { items: [], selectedCustomer: null, loading: false, error: null },
  reducers: { clearError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCustomers.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchCustomers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchCustomerDetail.fulfilled, (state, action) => { state.selectedCustomer = action.payload; })
      .addCase(createCustomer.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const idx = state.items.findIndex(c => c._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c._id !== action.payload);
      });
  },
});

export const { clearError } = customersSlice.actions;
export default customersSlice.reducer;
