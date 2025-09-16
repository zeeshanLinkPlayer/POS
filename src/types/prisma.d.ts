import { PrismaClient, User, UserRole, Permission } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

declare module 'express' {
  interface Request {
    user?: {
      userId: string;
      email: string;
      role: UserRole;
      permissions: Permission[];
    };
  }
}

export {};
