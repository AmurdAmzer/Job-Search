const mongoose = require('mongoose');

const interviewPrepSchema = new mongoose.Schema({
  userId: String,
  jobId: String,
  jobTitle: String,
  jobDescription: String,
  skills: [String],
  prep: {
    technicalQuestions: [String],
    behavioralQuestions: [String],
    studyResources: [
      {
        title: String,
        url: String
      }
    ]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InterviewPrep', interviewPrepSchema);
