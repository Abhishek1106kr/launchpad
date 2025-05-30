const express = require('express');
const Resource = require('../models/Resource');
const router = express.Router();

// GET all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: 1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET resource by ID
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new resource
router.post('/', async (req, res) => {
  const { title, description, icon, content } = req.body;
  if (!title || !description || !icon || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const resource = await Resource.create({ title, description, icon, content });
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
