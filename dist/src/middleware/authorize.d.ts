import { Request, Response, NextFunction } from 'express';
type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'CUSTOMER';
export declare const authorize: (roles: UserRole | UserRole[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
