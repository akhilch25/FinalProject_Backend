const express = require('express');
const { putAnswers } = require('../controllers/testResultController');
const router = express.Router();

router.post('/submit-test', putAnswers);

module.exports = router;