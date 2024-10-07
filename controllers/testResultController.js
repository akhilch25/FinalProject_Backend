const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Route to handle quiz submission
const putAnswers = async (req, res) => {
    const { courseID, answers } = req.body;

    try {
        // Fetch the correct answers from the database
        const testDetails = await prisma.testDetails.findUnique({
            where: { courseID },
            select: { testData: true },
        });

        if (!testDetails) {
            return res.status(404).json({ error: 'Test not found for this course' });
        }

        const correctAnswers = testDetails.testData.Questions;
        const correctCount = Object.keys(answers).filter(key => answers[key] === correctAnswers[key].Answer).length;
        const totalQuestions = Object.keys(correctAnswers).length;

        // Save the score to the database or perform any additional logic
        const percentageScore = (correctCount / totalQuestions) * 100;

        // Optionally, save the score to a table for results (you would need to create this table)
        await prisma.testResults.create({
            data: {
                courseID,
                score: percentageScore,
                passed: percentageScore >= 80, // Assuming 80% is passing
            },
        });

        res.status(200).json({ message: 'Test submitted successfully', score: percentageScore });
    } catch (error) {
        console.error('Error submitting test:', error);
        res.status(500).json({ error: 'Failed to submit test. Please try again.' });
    }
};

module.exports = {putAnswers};
