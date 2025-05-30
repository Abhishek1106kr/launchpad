const express = require('express');
const TrendingEvent = require('../models/TrendingEvent');
const router = express.Router();

// GET all trending events
router.get('/', async (req, res) => {
  try {
    const events = await TrendingEvent.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new trending event
router.post('/', async (req, res) => {
  const { title, description, image, date, location, time, category } = req.body;
  if (!title || !description || !image || !date || !location || !time || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const event = await TrendingEvent.create({
      title, description, image, date, location, time, category
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// ...existing code...

// GET a single event by ID
router.get('/:id', async (req, res) => {
    try {
      const event = await TrendingEvent.findById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.json(event);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
