const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  type: String,
  duration: String,
  salary: String,
  skills: [String],
  description: String,
  postedDate: String,
  isFeatured: Boolean,
  logo: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
