const router = require('express').Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res, next) => {
  try {
    const { resort, type, status, search } = req.query;
    let filter = {};
    if (resort) filter.resort = resort;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const events = await Event.find(filter).populate('resort', 'name').sort({ date: -1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
});

// GET single event
router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('resort', 'name');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
});

// POST create event
router.post('/', async (req, res, next) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();
    const populated = await saved.populate('resort', 'name');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// PUT update event
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('resort', 'name');
    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE event
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
