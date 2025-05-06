const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected', 'Withdrawn'],
      default: 'Saved',
    },
    notes: String,
    appliedDate: Date,
    interviews: [
      {
        date: Date,
        type: {
          type: String,
          enum: ['Phone', 'Video', 'In-person', 'Technical', 'Other'],
        },
        notes: String,
      },
    ],
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;