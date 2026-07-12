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

    const rooms = await Room.find({ resort: resortId, category: roomType });
    const roomIds = rooms.map(r => r._id);
    const totalRoomsCount = rooms.length;

    // Find bookings for any of these rooms in the specified range
    const bookings = await Booking.find({
      roomId: { $in: roomIds },
      bookingStatus: { $nin: ['cancelled'] },
    });

    let events = [];
    for(let b of bookings) {
      events.push({ time: b.checkIn.getTime(), type: 'in' });
      events.push({ time: b.checkOut.getTime(), type: 'out' });
    }
    events.sort((a, b) => a.time - b.time || (a.type === 'out' ? -1 : 1));

    let currentBooked = 0;
    let fullyBookedRanges = [];
    let fullStart = null;

    for(let e of events) {
      if (e.type === 'in') {
        currentBooked++;
        if (currentBooked >= totalRoomsCount && fullStart === null) {
          fullStart = e.time;
        }
      } else {
        if (currentBooked >= totalRoomsCount && fullStart !== null) {
          fullyBookedRanges.push({ checkIn: new Date(fullStart), checkOut: new Date(e.time) });
          fullStart = null;
        }
        currentBooked--;
      }
    }

    res.json(fullyBookedRanges);
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
      guests, adults, children, totalAmount,
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

    // Pre-calculate room needs
    const requestedAdults = parseInt(adults) || parseInt(guests) || 1;
    const requestedChildren = parseInt(children) || 0;
    const requestedGuests = requestedAdults + requestedChildren;
    let roomCapacity = 2; // Default
    
    // Find rooms first to get capacity
    const roomsInCategory = await Room.find({
      resort: resortId,
      category: roomType,
      status: { $ne: 'Maintenance' }
    });

    if (roomsInCategory.length === 0) {
      return res.status(400).json({ message: 'No rooms available in this category' });
    }
    
    if (roomsInCategory.length > 0 && roomsInCategory[0].capacity) {
      roomCapacity = roomsInCategory[0].capacity;
    }
    const numRoomsNeeded = Math.ceil(requestedGuests / roomCapacity);
    
    // Securely calculate total amount on backend
    const roomPrice = roomsInCategory.length > 0 ? roomsInCategory[0].price : 0;
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const backendTotalAmount = (diffDays > 0 ? diffDays : 1) * roomPrice * numRoomsNeeded;

    // 4. Create Customer (Always create a new record to show separate booking histories in the dashboard)
    const customer = new Customer({
      name, email, phone,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: requestedAdults,
      children: requestedChildren,
      roomType: roomType,
      roomCount: numRoomsNeeded,
      totalAmount: backendTotalAmount,
      bookingStatus: bookingStatus || 'confirmed',
      paymentStatus: paymentStatus || 'pending',
      specialRequests: specialRequests || '',
    });
    await customer.save();

    // 5. --- AUTOMATIC ROOM ASSIGNMENT LOGIC ---
    let assignedRooms = [];
    for (const room of roomsInCategory) {
      const overlap = await Booking.findOne({
        roomId: room._id,
        bookingStatus: { $nin: ['cancelled'] },
        $or: [
          { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
        ],
      });

      if (!overlap) {
        assignedRooms.push(room);
        if (assignedRooms.length === numRoomsNeeded) break;
      }
    }

    if (assignedRooms.length < numRoomsNeeded) {
      return res.status(400).json({ message: `Not enough rooms available. You need ${numRoomsNeeded} room(s) for ${requestedGuests} guests, but only ${assignedRooms.length} room(s) are available on these dates.` });
    }

    // 6. Create the Bookings
    const amountPerRoom = backendTotalAmount / numRoomsNeeded;
    const savedBookings = [];
    const populatedBookings = [];

    for (const room of assignedRooms) {
      const booking = new Booking({
        customerId: customer._id,
        resortId,
        roomId: room._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: Math.min(requestedGuests, roomCapacity),
        totalAmount: amountPerRoom,
        paymentMethod: paymentMethod || 'Cash',
        paymentStatus: paymentStatus || 'pending',
        bookingStatus: bookingStatus || 'confirmed',
        specialRequests: specialRequests || '',
      });
      const saved = await booking.save();
      savedBookings.push(saved);

      const populated = await Booking.findById(saved._id)
        .populate('resortId', 'name location')
        .populate('customerId', 'name email phone')
        .populate('roomId', 'roomNumber category');
      populatedBookings.push(populated);
    }

    // 7. Trigger Notifications
    const emailBookingData = {
      ...populatedBookings[0].toObject(),
      roomId: {
        category: populatedBookings[0].roomId.category,
        roomNumber: populatedBookings.map(b => b.roomId.roomNumber).join(', ')
      },
      totalAmount: backendTotalAmount,
      guests: requestedGuests
    };

    await NotificationService.sendEmailConfirmation(emailBookingData, customer);
    await NotificationService.sendSMSConfirmation(customer.phone, savedBookings[0]._id);

    res.status(201).json(populatedBookings[0]);
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
    if (updates.bookingStatus && !['confirmed', 'check-in', 'check-out', 'cancelled'].includes(updates.bookingStatus)) {
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
