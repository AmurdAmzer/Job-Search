const express = require('express');
const router = express.Router();
const { generateInterviewPrep } = require('../controllers/interviewController');

// Route: POST /api/interview-prep/:jobId
router.post('/:jobId', generateInterviewPrep);

module.exports = router;