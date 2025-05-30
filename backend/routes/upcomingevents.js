const express = require('express');
const Event = require('../models/upcomingEvent');
const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new event
router.post('/', async (req, res) => {
  const { day, month, title, time, location } = req.body;
  if (!day || !month || !title || !time || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const event = await Event.create({ day, month, title, time, location });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
