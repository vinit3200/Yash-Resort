const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  resortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resort', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, default: 1 },
  totalAmount: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ['Online', 'Cash'], default: 'Cash' },
  paymentStatus: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  bookingStatus: { type: String, enum: ['confirmed', 'check-in', 'check-out', 'cancelled'], default: 'confirmed' },
  specialRequests: { type: String, default: '' },
}, { timestamps: true });

bookingSchema.index({ resortId: 1, roomId: 1, checkIn: 1, checkOut: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
