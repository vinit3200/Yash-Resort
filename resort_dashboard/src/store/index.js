import { configureStore } from '@reduxjs/toolkit';
import resortsReducer from './slices/resortsSlice';
import roomsReducer from './slices/roomsSlice';
import bookingsReducer from './slices/bookingsSlice';
import customersReducer from './slices/customersSlice';
import eventsReducer from './slices/eventsSlice';
import dashboardReducer from './slices/dashboardSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    resorts: resortsReducer,
    rooms: roomsReducer,
    bookings: bookingsReducer,
    customers: customersReducer,
    events: eventsReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  },
});

export default store;
