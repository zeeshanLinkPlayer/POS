import { Request, Response, NextFunction, RequestHandler } from 'express';
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const createRouteHandler: (fn: AsyncRequestHandler) => RequestHandler;
export {};
