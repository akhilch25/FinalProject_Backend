const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Route to handle quiz submission
const putQuiz = async (req, res) => {
    const { courseID, testData } = req.body; // Expecting courseID and testData (JSON) from the request

    try {

        const course = await prisma.course.findUnique({
            where: { courseID: courseID }
        });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const test = await prisma.testDetails.findUnique({
            where: {
                courseID: courseID
            }
        });

        // If the quiz already exists, return 409 Conflict
        if (test) {
            return res.status(409).json({ error: 'Quiz already exists for this course' });
        }
        // Insert the quiz data into the TestDetails table
        const newTestDetails = await prisma.testDetails.create({
            data: {
                courseID: course.courseID, 
                testData: testData // Store the JSON data (questions, options, etc.)
            }
        });

        res.status(201).json({ message: "Quiz added successfully", newTestDetails });
    } catch (error) {
        console.error("Error adding quiz:", error);
        res.status(500).json({ error: "Failed to add quiz" });
    }
};

const getQuiz = async (req, res) => {
    const { courseID } = req.params;
  
    try {
      // Fetch the test details based on the course ID
      const testDetails = await prisma.testDetails.findUnique({
        where: {
          courseID: courseID,
        },
      });
  
      if (!testDetails) {
        return res.status(404).json({ message: 'No quiz found for this course.' });
      }
  
      // Parse the JSON field to get test data
      const testData = testDetails.testData;
  
      res.status(200).json({ testData: testData });
    } catch (error) {
      console.error('Error fetching quiz data', error);
      res.status(500).json({ error: 'Failed to fetch quiz data' });
    }
  };

module.exports = {putQuiz, getQuiz};
