// const mongoose = require('mongoose');

// const favoriteSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   jobId: { type: String, required: true },
//   jobTitle: String,
//   employer: String,
//   applyLink: String,
//   savedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Favorite', favoriteSchema);
// Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
  },
  applicationDeadline: Date,
  externalUrl: String,
  source: {
    type: String,
    enum: ['LinkedIn', 'Indeed', 'Glassdoor', 'Manual'],
    required: true
  },
  sourceId: String,
  savedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
