const mongoose = require('mongoose');

const InterviewPrepSchema = new mongoose.Schema({
  userId: String,
  jobId: String,
  jobTitle: String,
  prep: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('InterviewPrep', InterviewPrepSchema);
