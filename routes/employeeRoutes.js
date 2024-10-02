const express = require('express');
const { getEmployees, getEmployeeById } = require('../controllers/employeeController');
const router = express.Router();

router.get('/employee', getEmployees);
router.get('/employee/:empID', getEmployeeById); 

module.exports = router;