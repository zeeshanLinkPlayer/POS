import { RequestHandler } from "express";
import { UserRole, Permission } from "@prisma/client";
export type JwtUserPayload = {
    userId: string;
    email: string;
    role: UserRole;
    permissions: Permission[];
    iat?: number;
    exp?: number;
};
declare global {
    namespace Express {
        interface Request {
            user?: JwtUserPayload;
        }
    }
}
/**
 * 🔑 Authentication Middleware
 */
export declare const authenticateJWT: RequestHandler;
/**
 * 🔑 Role-based Access Middleware
 */
export declare const checkRole: (roles: UserRole[]) => RequestHandler;
/**
 * 🔑 Permission-based Access Middleware
 */
export declare const checkPermission: (permissions: Permission[]) => RequestHandler;
/**
 * 🔑 Rate Limiter
 */
export declare const apiLimiter: import("express-rate-limit").RateLimitRequestHandler;
import Joi from 'joi';
/**
 * 🔑 Request Validator for Joi schemas
 */
type JoiSchema = {
    body?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
};
export declare const validateRequest: (schema: JoiSchema) => RequestHandler;
export {};
