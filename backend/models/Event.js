const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Wedding', 'Corporate', 'Birthday', 'Conference', 'Function', 'Other'], required: true },
  resort: { type: mongoose.Schema.Types.ObjectId, ref: 'Resort', required: true },
  date: { type: Date, required: true },
  endDate: { type: Date },
  guestCount: { type: Number, required: true },
  organizer: { type: String, required: true },
  contactPhone: { type: String, default: '' },
  contactEmail: { type: String, default: '' },
  budget: { type: Number, default: 0 },
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], default: 'Upcoming' },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
