const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

const putCourse = async (req, res) => {
    const {courseID, name, duration, difficulty_level, learning_path } = req.body;
    try{
        const newCourse = await prisma.Course.create({
            data: {courseID, name, duration, difficulty_level, learning_path},
        });
        res.json(newCourse);
    }
    catch (error) {
        res.status(500).json({ error: `Error adding courses: ${error.message}` });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await prisma.Course.findMany();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};

const getCourseById = async (req, res) => {
    const { courseID } = req.params; // Get courseID from the request parameters
    try {
        const course = await prisma.Course.findUnique({
            where: { courseID: courseID }, // Ensure this matches your database schema
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(courseID); // Return the course data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error: error.message });
    }
};
 
module.exports={putCourse, getCourses, getCourseById};