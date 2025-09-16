import { Request, Response } from "express";
export declare const productController: {
    create: (req: Request, res: Response) => Promise<void>;
    list: (_req: Request, res: Response) => Promise<void>;
    get: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
};
