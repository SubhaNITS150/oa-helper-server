import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient();

export const postAnalytics = async(req, res) => {
    const { userId,
            testId,
            totalQuestions, 
            attemptedQuestions, 
            notAttempted, 
            totalScore,
            noOfCorrect,
            mcqCorrect,
            codingCorrect,
            obtainedScore
        } = req.body;

    try {
        const newRes = await prisma.analytics.create({
            data: {
                userId,
                testId,
                totalQuestions,
                attemptedQuestions,
                notAttempted,
                totalScore,
                noOfCorrect,
                mcqCorrect,
                codingCorrect,
                obtainedScore
            }
        });

        return res.status(200).send({
            message: "Analytics data saved successfully",
        })
    } catch(error){
        res.status(500).send({error: error.message, message: "Something went wrong"});
    }
}