const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [String],
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD',
      },
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    },
    applicationDeadline: Date,
    externalUrl: String,
    source: {
      type: String,
      enum: ['LinkedIn', 'Indeed', 'Glassdoor', 'Manual'],
      required: true,
    },
    sourceId: String,
  },
  { timestamps: true }
);

// Add text index for search functionality
jobSchema.index(
  { title: 'text', company: 'text', description: 'text' },
  { weights: { title: 10, company: 5, description: 1 } }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;