import { OrderStatus, PaymentMethod, PaymentStatus, OrderType } from "@prisma/client";
export interface OrderItemInput {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
    taxRate: number;
    tax: number;
    total: number;
    notes?: string | null;
    modifiers?: any;
}
export interface CreateOrderInput {
    orderNumber: string;
    orderType?: OrderType;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    paymentMethod?: PaymentMethod | null;
    subtotal: number;
    tax: number;
    discount?: number;
    total: number;
    tableNumber?: string | null;
    customerName?: string | null;
    customerEmail?: string | null;
    customerPhone?: string | null;
    notes?: string | null;
    items: OrderItemInput[];
}
export interface UpdateOrderInput {
    status?: OrderStatus | null;
    paymentMethod?: PaymentMethod | null;
    paymentStatus?: PaymentStatus | null;
    total?: number | null;
    items?: OrderItemInput[];
}
