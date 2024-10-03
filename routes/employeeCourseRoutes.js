const express = require('express');
const { putEmpCourseDetails, getDetails, getEmployeeCourseById, putEmployeeCourseById } = require('../controllers/employeeCourseController');
const router = express.Router();

router.post('/employee-course', putEmpCourseDetails);
router.get('/employee-course', getDetails);
router.get('/employee-course/:empID',getEmployeeCourseById);
router.put('/employee-course/:empID/:courseID',putEmployeeCourseById);

module.exports = router;