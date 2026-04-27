const router = require('express').Router();
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const Room = require('../models/Room');
const NotificationService = require('../services/notificationService');

// GET /api/bookings - List all bookings (admin view)
router.get('/', async (req, res, next) => {
  try {
    const { resortId, status, paymentStatus, search } = req.query;
    let filter = {};
    if (resortId) filter.resortId = resortId;
    if (status) filter.bookingStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const bookings = await Booking.find(filter)
      .populate('resortId', 'name location')
      .populate('customerId', 'name email phone')
      .populate('roomId', 'roomNumber category')
      .sort({ createdAt: -1 });

    if (search) {
      const lowerSearch = search.toLowerCase();
      const filtered = bookings.filter(b =>
        b.customerId?.name?.toLowerCase().includes(lowerSearch) ||
        b.customerId?.email?.toLowerCase().includes(lowerSearch) ||
        b.customerId?.phone?.includes(search) ||
        b.roomId?.roomNumber?.toLowerCase().includes(lowerSearch)
      );
      return res.json(filtered);
    }
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// GET /api/bookings/:id
router.get('/:id', async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('resortId', 'name location')
      .populate('customerId', 'name email phone')
      .populate('roomId', 'roomNumber category');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// GET /api/availability/:resortId/:roomType - PUBLIC
router.get('/availability/:resortId/:roomType', async (req, res, next) => {
  try {
    const { resortId, roomType } = req.params;

    // Find all rooms of this type
    const rooms = await Room.find({ resort: resortId, category: roomType });
    const roomIds = rooms.map(r => r._id);

    // Find bookings for any of these rooms in the specified range
    const bookings = await Booking.find({
      roomId: { $in: roomIds },
      bookingStatus: { $nin: ['cancelled'] },
    }, 'checkIn checkOut').sort({ checkIn: 1 });

    const ranges = bookings.map(b => ({
      checkIn: b.checkIn,
      checkOut: b.checkOut,
    }));
    res.json(ranges);
  } catch (err) {
    next(err);
  }
});

// POST /api/bookings - Create booking - PUBLIC
router.post('/', async (req, res, next) => {
  try {
    const {
      name, phone, email,
      resortId, roomType,
      checkIn, checkOut,
      guests, totalAmount,
      paymentMethod, paymentStatus,
      bookingStatus,
      specialRequests
    } = req.body;

    // 1. Validate required fields
    const required = ['name', 'phone', 'email', 'resortId', 'roomType', 'checkIn', 'checkOut'];
    for (const field of required) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // 3. Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: 'checkOut must be after checkIn' });
    }

    // 4. Create or Find Customer
    let customer = await Customer.findOne({ email, phone });
    if (!customer) {
      customer = new Customer({ name, email, phone });
      await customer.save();
    }

    // 5. --- AUTOMATIC ROOM ASSIGNMENT LOGIC ---
    const roomsInCategory = await Room.find({
      resort: resortId,
      category: roomType
    });

    if (roomsInCategory.length === 0) {
      return res.status(400).json({ message: 'No rooms available in this category' });
    }

    let assignedRoom = null;
    for (const room of roomsInCategory) {
      const overlap = await Booking.findOne({
        roomId: room._id,
        bookingStatus: { $nin: ['cancelled'] },
        $or: [
          { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
        ],
      });

      if (!overlap) {
        assignedRoom = room;
        break;
      }
    }

    if (!assignedRoom) {
      return res.status(400).json({ message: 'All rooms in this category are fully booked for the selected dates' });
    }

    // 6. Create the Booking
    const booking = new Booking({
      customerId: customer._id,
      resortId,
      roomId: assignedRoom._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests || 1,
      totalAmount: totalAmount || 0,
      paymentMethod: paymentMethod || 'Cash',
      paymentStatus: paymentStatus || 'pending',
      bookingStatus: bookingStatus || 'confirmed',
      specialRequests: specialRequests || '',
    });

    const saved = await booking.save();

    // 7. Trigger Notifications
    await NotificationService.sendEmailConfirmation(saved, customer);
    await NotificationService.sendSMSConfirmation(customer.phone, saved._id);

    const populated = await Booking.findById(saved._id)
      .populate('resortId', 'name location')
      .populate('customerId', 'name email phone')
      .populate('roomId', 'roomNumber category');

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// PUT /api/bookings/:id - Update booking (admin actions)
router.put('/:id', async (req, res, next) => {
  try {
    const existing = await Booking.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Booking not found' });

    const allowedUpdates = [
      'paymentStatus', 'bookingStatus', 'roomId',
      'checkIn', 'checkOut', 'guests', 'totalAmount', 'specialRequests',
    ];
    const updates = {};

    for (const field of allowedUpdates) {
      if (req.body[field] !== undefined) {
        if (field === 'checkIn' || field === 'checkOut') {
          updates[field] = new Date(req.body[field]);
        } else {
          updates[field] = req.body[field];
        }
      }
    }

    if (updates.paymentStatus && !['paid', 'pending'].includes(updates.paymentStatus)) {
      return res.status(400).json({ message: 'Invalid paymentStatus' });
    }
    if (updates.bookingStatus && !['confirmed', 'pending', 'cancelled'].includes(updates.bookingStatus)) {
      return res.status(400).json({ message: 'Invalid bookingStatus' });
    }

    if (updates.checkIn || updates.checkOut) {
      const newCheckIn = updates.checkIn || existing.checkIn;
      const newCheckOut = updates.checkOut || existing.checkOut;
      const overlap = await Booking.findOne({
        _id: { $ne: req.params.id },
        roomId: existing.roomId,
        bookingStatus: { $nin: ['cancelled'] },
        $or: [
          { checkIn: { $lt: newCheckOut }, checkOut: { $gt: newCheckIn } },
        ],
      });
      if (overlap) {
        return res.status(400).json({ message: 'Dates conflict with another booking' });
      }
    }

    const updated = await Booking.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate('resortId', 'name location')
      .populate('customerId', 'name email phone')
      .populate('roomId', 'roomNumber category');

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/bookings/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
