const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  day: String,
  month: String,
  title: String,
  time: String,
  location: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
