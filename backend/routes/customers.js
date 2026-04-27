const router = require('express').Router();
const Customer = require('../models/Customer');
const Booking = require('../models/Booking');

// GET all customers
router.get('/', async (req, res, next) => {
  try {
    const { search, vip } = req.query;
    let filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }
    const customers = await Customer.find(filter).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

// GET single customer with booking history
router.get('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    const bookings = await Booking.find({ customer: req.params.id })
      .populate('resort', 'name')
      .populate('room', 'roomNumber category')
      .sort({ checkIn: -1 });
    res.json({ ...customer.toObject(), bookings });
  } catch (err) {
    next(err);
  }
});

// POST create customer
router.post('/', async (req, res, next) => {
  try {
    const customer = new Customer(req.body);
    const saved = await customer.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// PUT update customer
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Customer not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE customer
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
