const express = require('express');
const { putEmpCourseDetails, getDetails, getEmployeeCourseById } = require('../controllers/employeeCourseController');
const router = express.Router();

router.post('/employee-course', putEmpCourseDetails);
router.get('/employee-course', getDetails);
router.get('/employee-course/:empID',getEmployeeCourseById);

module.exports = router;