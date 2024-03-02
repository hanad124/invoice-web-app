import { PrismaClient } from "@prisma/client";

export const connectToDB = async () => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log("Connected to DB");
    return prisma;
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw error;
  }
};
