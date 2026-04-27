const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  resort: { type: mongoose.Schema.Types.ObjectId, ref: 'Resort', required: true },
  roomNumber: { type: String, required: true },
  category: { type: String, enum: ['Classic', 'Executive', 'Cottage/Villa', 'Suite'], required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, default: 2 },
  amenities: [{ type: String }],
  status: { type: String, enum: ['Available', 'Booked', 'Maintenance'], default: 'Available' },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
