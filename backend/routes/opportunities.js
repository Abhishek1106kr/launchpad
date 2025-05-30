const express = require('express');
const Opportunity = require('../models/Opportunity');
const router = express.Router();

// GET all opportunities
router.get('/', async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new opportunity
router.post('/', async (req, res) => {
  const {
    title, company, location, type, duration, salary, skills,
    description, postedDate, isFeatured, logo
  } = req.body;
  if (!title || !company || !location || !type || !duration || !salary || !skills || !description || !postedDate || !logo) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const opportunity = await Opportunity.create({
      title, company, location, type, duration, salary, skills,
      description, postedDate, isFeatured, logo
    });
    res.status(201).json(opportunity);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
