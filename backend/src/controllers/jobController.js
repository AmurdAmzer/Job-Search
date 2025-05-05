const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Private
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search jobs
// @route   GET /api/jobs/search
// @access  Private
const searchJobs = async (req, res) => {
  try {
    const { query, location, jobType } = req.query;
    
    const searchCriteria = {};
    
    if (query) {
      searchCriteria.$text = { $search: query };
    }
    
    if (location) {
      searchCriteria.location = { $regex: location, $options: 'i' };
    }
    
    if (jobType) {
      searchCriteria.jobType = jobType;
    }
    
    const jobs = await Job.find(searchCriteria).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  searchJobs,
};