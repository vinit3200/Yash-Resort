const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// CORS configuration - allow resort website
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/resorts', require('./routes/resorts'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/availability', require('./routes/availability'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/events', require('./routes/events'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Global Error Handler - MUST be after all routes
app.use(errorHandler);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
