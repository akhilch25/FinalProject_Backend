const express = require('express');
const { putCourse } = require('../controllers/courseController');
const router = express.Router();

router.post('/course', putCourse);

module.exports = router;