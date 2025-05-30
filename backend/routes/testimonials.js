const express = require('express');
const Testimonial = require('../models/Testimonial');
const router = express.Router();

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new testimonial
router.post('/', async (req, res) => {
  const { content, name, role, avatar, rating } = req.body;
  if (!content || !name || !role || !avatar || !rating) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const testimonial = await Testimonial.create({ content, name, role, avatar, rating });
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
