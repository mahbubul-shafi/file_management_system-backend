import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  adapter: "postgresql",
  datasourceUrl: process.env.DATABASE_URL,
});

export default prisma;