const express = require('express');
const { putAnswers, getResults } = require('../controllers/testResultController');
const router = express.Router();

router.post('/submit-test', putAnswers);
router.get('/submit-test/:empID/:courseID', getResults);

module.exports = router;