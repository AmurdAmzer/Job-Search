import mongoose from 'mongoose';

const interviewPrepSchema = new mongoose.Schema({ // this creates schema to store interview prep
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

const InterviewPrep = mongoose.model('InterviewPrep', interviewPrepSchema);
export default InterviewPrep;
