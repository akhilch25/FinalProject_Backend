const express = require('express');
const { putQuiz, getQuiz } = require('../controllers/testDetailsController');
const router = express.Router();

router.post('/quiz', putQuiz);
router.get('/quiz/:courseID',getQuiz);

module.exports = router;