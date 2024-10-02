const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

const putCourse = async (req, res) => {
    const {courseID, name, duration, difficulty_level } = req.body;
    try{
        const newCourse = await prisma.Course.create({
            data: {courseID, name, duration, difficulty_level},
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
 
module.exports={putCourse, getCourses};