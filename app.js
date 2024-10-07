const express = require('express');
const authRoutes = require('./routes/authRoutes');
const employeeCourseRoutes = require('./routes/employeeCourseRoutes')
const courseRoutes = require('./routes/courseRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const app = express();
const cors = require('cors');

const corsOption={
    origin:'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOption));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/app', employeeCourseRoutes);
app.use('/app',courseRoutes);
app.use('/app',employeeRoutes)

const PORT= 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
module.exports = app;