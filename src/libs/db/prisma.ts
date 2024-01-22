import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

export const DB = new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = DB;
