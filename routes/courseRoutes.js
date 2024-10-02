const express = require('express');
const { putCourse, getCourses } = require('../controllers/courseController');
const router = express.Router();

router.post('/course', putCourse);
router.get('/course',getCourses);

module.exports = router;