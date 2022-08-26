import { PrismaClient } from "@prisma/client";

export const afterAll = async (prisma: PrismaClient) => {
  await prisma.$disconnect();
};
