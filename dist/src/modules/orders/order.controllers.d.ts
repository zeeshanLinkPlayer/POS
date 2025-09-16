import { Request, Response } from "express";
import { OrderStatus, PaymentStatus, OrderType } from '@prisma/client';
interface OrderQueryParams {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    orderType?: OrderType;
    startDate?: string;
    endDate?: string;
    search?: string;
    page?: string;
    pageSize?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export declare const createOrder: (req: Request, res: Response) => Promise<void>;
export declare const getOrders: (req: Request<{}, {}, {}, OrderQueryParams>, res: Response) => Promise<void>;
export declare const updatePaymentStatus: (req: Request, res: Response) => Promise<void>;
export declare const getOrderStats: (req: Request, res: Response) => Promise<void>;
export declare const getOrderById: (req: Request, res: Response) => Promise<void>;
export declare const updateOrderStatus: (req: Request, res: Response) => Promise<void>;
export declare const deleteOrder: (req: Request, res: Response) => Promise<void>;
export {};
