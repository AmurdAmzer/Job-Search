const Application = require('../models/Application');

// @desc    Get user's applications
// @route   GET /api/applications
// @access  Private
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate('job')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
const createApplication = async (req, res) => {
  try {
    const { jobId, status, notes } = req.body;
    
    // Check if application already exists
    const existingApplication = await Application.findOne({
      user: req.user._id,
      job: jobId,
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'Application already exists' });
    }
    
    const application = await Application.create({
      user: req.user._id,
      job: jobId,
      status,
      notes,
      appliedDate: status === 'Applied' ? new Date() : null,
    });
    
    const populatedApplication = await Application.findById(application._id).populate('job');
    
    res.status(201).json(populatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
const updateApplication = async (req, res) => {
  try {
    const { status, notes, interviews } = req.body;
    
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if application belongs to user
    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Update fields
    if (status) {
      application.status = status;
      if (status === 'Applied' && !application.appliedDate) {
        application.appliedDate = new Date();
      }
    }
    
    if (notes) {
      application.notes = notes;
    }
    
    if (interviews) {
      application.interviews = interviews;
    }
    
    const updatedApplication = await application.save();
    const populatedApplication = await Application.findById(updatedApplication._id).populate('job');
    
    res.json(populatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if application belongs to user
    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await application.remove();
    res.json({ message: 'Application removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};