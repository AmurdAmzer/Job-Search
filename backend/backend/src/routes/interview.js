const express = require('express');
const { generateInterviewPrep, getInterviewPrepHistory } = require('../controllers/interviewController');
const router = express.Router();

router.post('/', generateInterviewPrep);
router.get('/:userId', getInterviewPrepHistory);

module.exports = router;
