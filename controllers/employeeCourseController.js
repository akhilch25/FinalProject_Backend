const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

const getDetails = async (req, res) => {
    try {
        const employeeCourses = await prisma.EmployeeCourse.findMany({
            include:{
                course:{
                    select: {
                        courseID: true,
                        name: true,
                    },
                },
                employee:{
                    select:{
                        name:true,
                    },
                },
            },
        });
        res.status(200).json(employeeCourses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};

const getEmployeeCourseById = async (req, res) => {
    const { empID } = req.params; // Get empID from the request parameters
    try {
        const employee = await prisma.EmployeeCourse.findMany({
            where: { empID: empID }, // Ensure this matches your database schema
            include: {
                course: true, // Include the Course details in the response
              },
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee); // Return the employee data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error: error.message });
    }
};

const putEmployeeCourseById = async (req, res) => {
    const { empID, courseID } = req.params; // Retrieve empID and courseID from the request params
    const { completion_rate } = req.body;   // Retrieve completion_rate from the request body
    
    try {
        // Ensure completion_rate is valid
        if (completion_rate < 0 || completion_rate > 100) {
            return res.status(400).json({ message: 'Completion rate must be between 0 and 100.' });
        }

        // Find and update the EmployeeCourse by empID and courseID
        const updatedCourse = await prisma.EmployeeCourse.updateMany({
            where: {
                empID: empID,
                courseID: courseID
            },
            data: {
                completion_rate: completion_rate
            }
        });

        if (updatedCourse.count === 0) {
            return res.status(404).json({ message: 'Course or Employee not found' });
        }

        res.status(200).json({ message: 'Course completion rate updated successfully', data: updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Error updating course', error: error.message });
    }
};

const putEmpCourseDetails = async (req, res) => {
    const { empID, courseID } = req.body;
 
    try {
         await prisma.EmployeeCourse.create({
            data: { empID, courseID },
        });
        
        res.status(201).json({ message: 'Course assigned successfully'});
    } 
    catch (error) {
        res.status(500).json({ error: `Error assigning course: ${error.message}` });
    }
};

module.exports={getDetails,putEmpCourseDetails, getEmployeeCourseById, putEmployeeCourseById};