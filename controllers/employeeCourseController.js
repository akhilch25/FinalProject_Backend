const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

const getDetails = async (req, res) => {
    try {
        const employeeCourses = await prisma.EmployeeCourse.findMany();
        res.status(200).json(employeeCourses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};
const putEmpCourseDetails = async (req, res) => {
    const { empID, courseID } = req.body;
 
    try {

        // Check if the empID exists in the Employee table
        const employeeExists = await prisma.Employee.findUnique({
            where: { empID: empID },
        });
    
        if (!employeeExists) {
            return res.status(400).json({ error: "Employee does not exist." });
        }
    
        // Check if the courseID exists in the Course table
        const courseExists = await prisma.Course.findUnique({
            where: { courseID: courseID },
        });
    
        if (!courseExists) {
            return res.status(400).json({ error: "Course does not exist." });
        }
        const newEmployeeCourse = await prisma.EmployeeCourse.create({
            data: { empID, courseID },
        });
        res.json(newEmployeeCourse);
    } 
    catch (error) {
        res.status(500).json({ error: `Error assigning courses: ${error.message}` });
    }
};
 

module.exports={getDetails,putEmpCourseDetails};