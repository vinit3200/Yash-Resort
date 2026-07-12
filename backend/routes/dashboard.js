const router = require('express').Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Customer = require('../models/Customer');
const Resort = require('../models/Resort');
const Event = require('../models/Event');

// GET dashboard stats
router.get('/stats', async (req, res, next) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalRooms = await Room.countDocuments();
    const totalResorts = await Resort.countDocuments();
    const totalEvents = await Event.countDocuments();

    const bookedRooms = await Room.countDocuments({ status: 'Booked' });
    const occupancyRate = totalRooms > 0 ? Math.round((bookedRooms / totalRooms) * 100) : 0;

    // Active guests = bookings with confirmed/check-in status where checkOut hasn't passed
    const now = new Date();
    const activeGuests = await Booking.countDocuments({
      bookingStatus: { $in: ['confirmed', 'check-in'] },
      checkOut: { $gte: now }
    });

    // Revenue calculation - sum of all bookings (both paid and pending)
    const allBookings = await Booking.find();
    const totalRevenue = allBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    // Monthly revenue for chart (last 6 months)
    const monthlyRevenue = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      const monthBookings = await Booking.find({
        createdAt: { $gte: start, $lte: end }
      });
      const rev = monthBookings.reduce((sum, b) => sum + b.totalAmount, 0);
      monthlyRevenue.push({ month: monthNames[d.getMonth()], revenue: rev, bookings: monthBookings.length });
    }

    // Recent bookings
    const recentBookings = await Booking.find()
      .populate('resortId', 'name')
      .populate('roomId', 'roomNumber category')
      .populate('customerId', 'name checkIn checkOut adults children')
      .sort({ createdAt: -1 })
      .limit(5);

    // Upcoming events
    const upcomingEvents = await Event.find({ date: { $gte: new Date() }, status: 'Upcoming' })
      .populate('resort', 'name')
      .sort({ date: 1 })
      .limit(5);

    res.json({
      stats: { totalBookings, totalRevenue, occupancyRate, activeGuests, totalCustomers, totalRooms, totalResorts, totalEvents },
      monthlyRevenue,
      recentBookings,
      upcomingEvents,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
