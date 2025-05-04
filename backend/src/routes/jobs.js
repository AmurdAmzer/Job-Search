const express = require('express');
const router = express.Router();
const { 
  getJobs, 
  getJobById, 
  searchJobs 
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.get('/', protect, getJobs);
router.get('/search', protect, searchJobs);
router.get('/:id', protect, getJobById);

module.exports = router;