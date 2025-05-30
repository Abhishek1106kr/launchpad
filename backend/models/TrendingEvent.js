const mongoose = require('mongoose');

const trendingEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  date: String,
  location: String,
  time: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrendingEvent', trendingEventSchema);
