const express = require('express');
const multer = require('multer');
const { handleResumeUpload } = require('../controllers/resumeController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/match', upload.single('resume'), handleResumeUpload);

module.exports = router;
