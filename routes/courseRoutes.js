const express = require('express');
const { putCourse, getCourses, getCourseById } = require('../controllers/courseController');
const router = express.Router();

router.post('/course', putCourse);
router.get('/course',getCourses);
router.get('/course/:courseID',getCourseById);

module.exports = router;