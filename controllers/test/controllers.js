import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient();

const createTest = async (req, res) => {
  const {
    title,
    description,
    numberOfQuestions,
    mcqCount,
    codingCount,
    totalScore,
    userId,
    mcqIds,
    codingQuestionIds,
  } = req.body;

  try {
    if (
      title === undefined ||
      title.trim() === "" ||
      numberOfQuestions === undefined ||
      numberOfQuestions <= 0 ||
      mcqCount === undefined ||
      mcqCount < 0 ||
      codingCount === undefined ||
      codingCount < 0 ||
      totalScore === undefined ||
      totalScore <= 0 ||
      userId === undefined ||
      userId.trim() === "" ||
      mcqIds === undefined ||
      codingQuestionIds === undefined
    ) {
      return res.status(400).send("Fields cannot be empty");
    }

    const newTest = await prisma.test.create({
      data: {
        title,
        description,
        numberOfQuestions,
        mcqCount,
        codingCount,
        totalScore,

        user: {
            connect: {id: userId},
        },

        mcqQuestions: {
            create: mcqIds.map((id) => ({
                mcqQuestion: {
                    connect: { id },
                }
            })),
        },

        codingQuestions: {
            create: codingQuestionIds.map((id) => ({
                codingQuestion: {
                    connect: { id },
                }
            })),
        }
      },
    });

    return res.status(201).json({ success: true, newTest });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};

export { createTest };
