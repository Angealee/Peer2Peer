import { PrismaClient } from "@/app/generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function parseDbUrl(url: string) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: u.port ? parseInt(u.port) : 3306,
    user: u.username,
    password: u.password,
    database: u.pathname.replace(/^\//, ""),
    allowPublicKeyRetrieval: true,
  };
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaMariaDb(parseDbUrl(process.env.DATABASE_URL!)) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;