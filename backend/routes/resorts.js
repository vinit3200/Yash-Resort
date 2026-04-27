const router = require('express').Router();
const Resort = require('../models/Resort');

// GET all resorts
router.get('/', async (req, res, next) => {
  try {
    const { search, status } = req.query;
    let filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (status) filter.status = status;
    const resorts = await Resort.find(filter).sort({ createdAt: -1 });
    res.json(resorts);
  } catch (err) {
    next(err);
  }
});

// GET single resort
router.get('/:id', async (req, res, next) => {
  try {
    const resort = await Resort.findById(req.params.id);
    if (!resort) return res.status(404).json({ message: 'Resort not found' });
    res.json(resort);
  } catch (err) {
    next(err);
  }
});

// POST create resort
router.post('/', async (req, res, next) => {
  try {
    const resort = new Resort(req.body);
    const saved = await resort.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// PUT update resort
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Resort.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Resort not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE resort
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Resort.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Resort not found' });
    res.json({ message: 'Resort deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
