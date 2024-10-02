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

module.exports={getDetails,putEmpCourseDetails, getEmployeeCourseById};