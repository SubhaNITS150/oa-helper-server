import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const addTopics = async (req, res) => {
    try {
        await prisma.topic.createMany({
            data: [
                { id: "topic_os", name: "Operating System" },
                { id: "topic_dbms", name: "DBMS" },
                { id: "topic_cn", name: "Computer Networks" },
                { id: "topic_ds", name: "Data Structures" }
            ],
            skipDuplicates: true
        });

        res.status(201).json({ message: 'Topics added successfully' });
    } catch (error) {
        console.error('Error adding topics:', error);
        res.status(500).json({ error: 'Failed to add topics' });
    } finally {
        await prisma.$disconnect();
    }
};

export const getTopics = async (req, res) => {
  try {
    const topics = await prisma.topic.findMany();

    if (!topics || topics.length === 0) {
      return res.status(404).json({ error: "No Topics Found" });
    }

    console.log("Topics fetched successfully");
    console.log(topics);

    return res.status(200).json(topics); 
  } catch (error) {
    console.error("Error fetching topics:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

