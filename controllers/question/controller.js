import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// import mcqs from "../../../constants/questions.js";
// import { coding } from "../../../constants/codingquestions.js"
const prisma = new PrismaClient();

export const addMCQS = async (req, res) => {
  try {
    const createdMCQs = await prisma.mCQ.createMany({
      data: mcqs,
      skipDuplicates: true,
    });

    console.log(` MCQs inserted successfully.`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

export const addCoding = async (req, res) => {
  try{
    const createdCoding = await prisma.codingQuestion.createMany({
      data: coding,
      skipDuplicates: true
    });

    return res.send("Coding Questions Added Successfully");
  } catch(error){
    console.log(error);
    return res.send("An error occured while adding coding questions");
  } finally {
    await prisma.$disconnect();
  }
}

export const addSingleQuestion = async (req, res) => {
  try {
    const {
      topic: {
        connect: {
          id: topicId, // assuming `id` in `Topic` table is "topic_cn"
        },
      },
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correct,
      // topicId,
    } = req.body;

    // ✅ Proper Validation and Response
    if (
      !topic ||
      !question ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correct ||
      !topicId
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Insert into DB
    const createMCQ = await prisma.mCQ.create({
      data: {
        topic,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correct,
        topicId,
      },
    });

    console.log("Single MCQ inserted successfully.");
    return res.status(201).json({ message: "MCQ created", data: createMCQ });
  } catch (error) {
    console.error("Error inserting MCQ:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const getQuestionsByTopic = async (req, res) => {
  try {
    const topicIds = req.query.topics?.split(",");

    if (!topicIds || topicIds.length === 0) {
      return res.status(404).json({ error: "No topics found with this topic" });
    }
    const questions = await prisma.mCQ.findMany({
      where: {
        topicId: { in: topicIds },
      },
      take: 20,
      include: {
        topic: true,
      },
    });

    return res.status(200).json(questions);
  } catch (e) {
    console.error("Error getting questions by topic", e);
  }
};
