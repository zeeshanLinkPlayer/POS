import Joi from 'joi';
import { OrderStatus, PaymentMethod } from "@prisma/client";
export declare const createOrderValidator: {
    body: Joi.ObjectSchema<any>;
};
export declare const updateOrderStatusValidator: {
    body: Joi.ObjectSchema<any>;
    params: Joi.ObjectSchema<any>;
};
type JoiSchema = {
    body?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
};
export declare const validateRequest: (schema: JoiSchema) => (req: any, res: any, next: any) => any;
export type CreateOrderInput = {
    items: Array<{
        menuItemId: string;
        quantity: number;
        selectedModifiers?: Array<{
            modifierId: string;
            selectedOptions: string[];
        }>;
    }>;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    paymentMethod: PaymentMethod;
    deliveryAddress?: string;
    tableNumber?: string;
};
export type UpdateOrderStatusInput = {
    status: OrderStatus;
    cancellationReason?: string;
};
export {};
