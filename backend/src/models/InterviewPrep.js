const mongoose = require('mongoose');

const studyResourceSchema = new mongoose.Schema({
  title: String,
  url: String
}, { _id: true });

const prepSchema = new mongoose.Schema({
  technicalQuestions: [String],
  behavioralQuestions: [String],
  studyResources: [studyResourceSchema]
}, { _id: false });

const interviewPrepSchema = new mongoose.Schema({
  userId: {
    type: String, // or mongoose.Schema.Types.ObjectId if linked to User
    required: true
  },
  jobId: {
    type: String, // use ObjectId if referencing the Job model
    required: true
  },
  title: String, // previously "jobTitle" – now matches Job model
  description: String, // previously "jobDescription" – now matches Job model
  skills: [String],
  prep: prepSchema
}, { timestamps: true });

module.exports = mongoose.model('InterviewPrep', interviewPrepSchema);
