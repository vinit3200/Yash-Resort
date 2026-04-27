const router = require('express').Router();
const Room = require('../models/Room');

// GET all rooms
router.get('/', async (req, res, next) => {
  try {
    const { resort, category, status, search } = req.query;
    let filter = {};
    if (resort) filter.resort = resort;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) filter.roomNumber = { $regex: search, $options: 'i' };
    const rooms = await Room.find(filter).populate('resort', 'name').sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    next(err);
  }
});

// GET single room
router.get('/:id', async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate('resort', 'name');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    next(err);
  }
});

// POST create room
router.post('/', async (req, res, next) => {
  try {
    const room = new Room(req.body);
    const saved = await room.save();
    const populated = await saved.populate('resort', 'name');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// PUT update room
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('resort', 'name');
    if (!updated) return res.status(404).json({ message: 'Room not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE room
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
