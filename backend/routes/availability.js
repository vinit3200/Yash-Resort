const router = require('express').Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// GET /api/availability?resortId=...&roomType=...
router.get('/', async (req, res) => {
  try {
    const { resortId, roomType } = req.query;
    if (!resortId || !roomType) {
      return res.status(400).json({ message: 'resortId and roomType are required' });
    }

    // 1. Find all rooms of this category in this resort
    const rooms = await Room.find({ resort: resortId, category: roomType, status: { $ne: 'Maintenance' } });
    const totalRoomsInCategory = rooms.length;

    if (totalRoomsInCategory === 0) {
      return res.json({ totalRooms: 0, availability: [] });
    }

    // 2. Find all active bookings for this category in this resort
    const bookings = await Booking.find({
      resortId,
      roomType,
      bookingStatus: { $nin: ['cancelled'] },
    }, 'checkIn checkOut').sort({ checkIn: 1 });

    // Return total rooms and the ranges of bookings
    // The frontend will now know: "There are X rooms total, and these are the intervals where some are occupied"
    res.json({
      totalRooms: totalRoomsInCategory,
      bookedRanges: bookings.map(b => ({
        checkIn: b.checkIn,
        checkOut: b.checkOut,
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
