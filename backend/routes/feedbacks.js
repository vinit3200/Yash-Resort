const router = require('express').Router();
const Feedback = require('../models/Feedback');

// GET all feedbacks
router.get('/', async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    next(err);
  }
});

// POST new feedback
router.post('/', async (req, res, next) => {
  try {
    const feedback = new Feedback(req.body);
    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// DELETE feedback
router.delete('/:id', async (req, res, next) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
