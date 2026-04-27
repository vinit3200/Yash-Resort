const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  adults: { type: Number, default: 1 },
  children: { type: Number, default: 0 },
  roomType: { type: String, enum: ['Classic', 'Executive', 'Cottage/Villa', 'Suite'], default: 'Classic' },
  roomCount: { type: Number, default: 1 },
  specialRequests: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
