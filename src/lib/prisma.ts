import {PrismaClient} from "@prisma/client";

const globalForPrisma = global as unknown as {prisma: PrismaClient};

const prismaClient =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });

export const prisma = prismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
