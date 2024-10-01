const express = require('express');
const { putEmpCourseDetails, getDetails } = require('../controllers/employeeCourseController');
const router = express.Router();

router.post('/employee-course', putEmpCourseDetails);
router.get('/employee-course', getDetails);

module.exports = router;