const mongoose = require('mongoose');

const resortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, default: '' },
  totalRooms: { type: Number, required: true },
  amenities: [{ type: String }],
  image: { type: String, default: '' },
  rating: { type: Number, default: 4.5 },
  contactEmail: { type: String, default: '' },
  contactPhone: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Inactive', 'Maintenance'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Resort', resortSchema);
