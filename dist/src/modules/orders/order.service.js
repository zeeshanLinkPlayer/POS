"use strict";
// import prisma from "../../loaders/prisma";
// import { JwtPayload } from "../../types/auth.types";
// import { ApiError } from "../../utils/apiResponse";
// import { CreateOrderInput, UpdateOrderInput } from "../../types/order.types";
// import { OrderType } from "@prisma/client";
// import { v4 as uuidv4 } from "uuid";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderService = exports.updatePaymentStatusService = exports.getOrderStatsService = exports.updateOrder = exports.updateOrderStatusService = exports.getOrderByIdService = exports.getOrdersService = exports.createOrderService = void 0;
// export const orderService = {
//   createOrder: async (data: CreateOrderInput, currentUser: JwtPayload) => {
//     if (!data.tableNumber && !data.customerName) {
//       throw ApiError.badRequest("Order must have either a table number or customer name");
//     }
//     try {
//       // Calculate subtotal from items
//       const subtotal = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//       const tax = data.items.reduce((sum, item) => {
//         const itemTax = (item.price * (item.taxRate || 0) / 100) * item.quantity;
//         return sum + itemTax;
//       }, 0);
//       const total = subtotal + tax - (data.discount || 0);
//       // Generate a unique order number if not provided
//       const orderNumber = data.orderNumber || `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
//       // First verify all menu items exist
//       const menuItemIds = data.items.map(item => item.menuItemId);
//       const existingItems = await prisma.menuItem.findMany({
//         where: { id: { in: menuItemIds } },
//         select: { id: true }
//       });
//       if (existingItems.length !== menuItemIds.length) {
//         const existingIds = new Set(existingItems.map(item => item.id));
//         const missingIds = menuItemIds.filter(id => !existingIds.has(id));
//         throw ApiError.badRequest(`The following menu items do not exist: ${missingIds.join(', ')}`);
//       }
//       const order = await prisma.order.create({
//         data: {
//           id: uuidv4(),
//           orderNumber,
//           orderType: data.orderType ?? OrderType.DINE_IN,
//           status: data.status || 'PENDING',
//           paymentStatus: data.paymentStatus || 'PENDING',
//           paymentMethod: data.paymentMethod,
//           subtotal,
//           tax,
//           discount: data.discount || 0,
//           total,
//           tableNumber: data.tableNumber,
//           customerName: data.customerName,
//           customerEmail: data.customerEmail,
//           customerPhone: data.customerPhone,
//           notes: data.notes,
//           createdById: currentUser.userId,
//           items: {
//             create: data.items.map((item) => ({
//               id: uuidv4(),
//               menuItemId: item.menuItemId,
//               name: item.name || 'Unnamed Item',
//               quantity: item.quantity,
//               price: item.price,
//               taxRate: item.taxRate || 0,
//               tax: (item.price * (item.taxRate || 0) / 100) * item.quantity,
//               total: item.quantity * item.price,
//               notes: item.notes,
//             })),
//           },
//         },
//         include: { items: true },
//       });
//       return order;
//     } catch (error) {
//         console.log(error);
//       throw ApiError.internal("Failed to create order");
//     }
//   },
//   getAllOrders: async (currentUser: JwtPayload) => {
//     try {
//       return prisma.order.findMany({
//         where: { createdById: currentUser.userId },
//         include: { items: true },
//         orderBy: { createdAt: "desc" },
//       });
//     } catch {
//       throw ApiError.internal("Failed to fetch orders");
//     }
//   },
//   getOrderById: async (id: string, currentUser: JwtPayload) => {
//     try {
//       const order = await prisma.order.findUnique({
//         where: { id },
//         include: { items: true },
//       });
//       if (!order) throw ApiError.notFound("Order not found");
//       return order;
//     } catch {
//       throw ApiError.internal("Failed to fetch order");
//     }
//   },
//   updateOrder: async (id: string, data: UpdateOrderInput, currentUser: JwtPayload) => {
//     try {
//       const updateData: any = {
//         status: data.status ?? undefined,
//         paymentStatus: data.paymentStatus ?? undefined,
//         paymentMethod: data.paymentMethod ?? undefined,
//         total: data.total ?? undefined,
//       };
//       if (data.items) {
//         updateData.items = {
//           deleteMany: {}, // clear old items
//           create: data.items.map((item) => ({
//             id: uuidv4(),
//             menuItemId: item.menuItemId,
//             quantity: item.quantity,
//             price: item.price,
//             notes: item.notes ?? undefined,
//           })),
//         };
//       }
//       const updated = await prisma.order.update({
//         where: { id },
//         data: updateData,
//         include: { items: true },
//       });
//       return updated;
//     } catch {
//       throw ApiError.internal("Failed to update order");
//     }
//   },
//   deleteOrder: async (id: string, currentUser: JwtPayload) => {
//     try {
//       await prisma.order.delete({ where: { id } });
//     } catch {
//       throw ApiError.internal("Failed to delete order");
//     }
//   },
// };
// @ts-nocheck
const client_1 = require("@prisma/client");
const apiResponse_1 = require("../../utils/apiResponse");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const createOrderService = async (data) => {
    const { tableNumber, customerName, items, paymentMethod = client_1.PaymentMethod.CASH, branchName, status = client_1.OrderStatus.PENDING, paymentStatus = client_1.PaymentStatus.PENDING, notes = '', total, subtotal, tax = 0, discount = 0 } = data;
    if (!branchName) {
        throw new Error("Branch name is required");
    }
    if (!tableNumber && !customerName) {
        throw new Error("Order must have either a table number or customer name");
    }
    // Calculate totals if not provided
    const calculatedSubtotal = subtotal ?? items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const calculatedTax = tax ?? 0; // You might want to calculate tax based on items
    const calculatedDiscount = discount ?? 0;
    const calculatedTotal = total ?? (calculatedSubtotal + calculatedTax - calculatedDiscount);
    // Initialize variables for order items
    let orderSubtotal = 0;
    let orderTaxTotal = 0;
    // Fetch all menu items in one query
    const menuItemIds = items.map((item) => item.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
        where: { id: { in: menuItemIds } },
    });
    // Create a map for quick lookup
    const menuItemMap = new Map(menuItems.map(item => [item.id, item]));
    // Calculate subtotal and tax for order items
    const orderItems = items.map(item => {
        const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
        if (!menuItem) {
            throw new Error(`Menu item with ID ${item.menuItemId} not found`);
        }
        const itemTotal = item.price * item.quantity;
        const itemTax = (itemTotal * (item.taxRate || 0)) / 100;
        orderSubtotal += itemTotal;
        orderTaxTotal += itemTax;
        return {
            menuItemId: item.menuItemId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            taxRate: item.taxRate || 0,
            tax: itemTax,
            total: itemTotal,
            notes: item.notes || null,
        };
    });
    const grandTotal = calculatedSubtotal + calculatedTax;
    // Generate order number (e.g., ORD-YYYYMMDD-XXXX)
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${dateStr}-${randomNum}`;
    // Create the order with items
    const order = await prisma.order.create({
        data: {
            orderNumber,
            orderType: data.orderType || 'DINE_IN',
            status: data.status || 'PENDING',
            paymentStatus: data.paymentStatus || 'PENDING',
            paymentMethod: data.paymentMethod,
            subtotal: calculatedSubtotal,
            tax: calculatedTax,
            total: grandTotal,
            discount: data.discount || 0,
            tableNumber: data.tableNumber || null,
            customerName: data.customerName || null,
            customerEmail: data.customerEmail || null,
            customerPhone: data.customerPhone || null,
            branchName: data.branchName || null,
            notes: data.notes || null,
            items: {
                create: orderItems.map(item => ({
                    menuItemId: item.menuItemId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    taxRate: item.taxRate,
                    tax: item.tax,
                    total: item.total,
                    notes: item.notes || null
                }))
            },
            createdById: data.createdById || null
        },
        include: {
            items: true,
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
    return order;
};
exports.createOrderService = createOrderService;
const getOrdersService = async (options = {}) => {
    const { status, paymentStatus, orderType, startDate, endDate, search, page = 1, pageSize = 10, sortBy = 'createdAt', sortOrder = 'desc', } = options;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const where = {};
    if (status)
        where.status = status;
    if (paymentStatus)
        where.paymentStatus = paymentStatus;
    if (orderType)
        where.orderType = orderType;
    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate)
            where.createdAt.gte = new Date(startDate);
        if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            where.createdAt.lte = end;
        }
    }
    if (search) {
        where.OR = [
            { orderNumber: { contains: search, mode: 'insensitive' } },
            { customerName: { contains: search, mode: 'insensitive' } },
            { customerEmail: { contains: search, mode: 'insensitive' } },
            { customerPhone: { contains: search, mode: 'insensitive' } },
            { tableNumber: { contains: search, mode: 'insensitive' } },
        ];
    }
    const [orders, total] = await Promise.all([
        prisma.order.findMany({
            where,
            include: {
                items: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                payments: true
            },
            orderBy: {
                [sortBy]: sortOrder,
            },
            skip,
            take,
        }),
        prisma.order.count({ where }),
    ]);
    return {
        data: orders,
        meta: {
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        },
    };
};
exports.getOrdersService = getOrdersService;
const getOrderByIdService = async (id) => {
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    menuItem: true,
                },
            },
            payments: true,
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    if (!order) {
        throw new apiResponse_1.ApiError('Order not found', 404);
    }
    return order;
};
exports.getOrderByIdService = getOrderByIdService;
const updateOrderStatusService = async (id, status, notes) => {
    const order = await prisma.order.update({
        where: { id },
        data: {
            status,
            ...(notes && { notes }),
        },
        include: {
            items: {
                include: {
                    menuItem: true,
                },
            },
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    // Here you can add logic for status change events (e.g., send notifications)
    // For example: sendOrderStatusUpdateNotification(order);
    return order;
};
exports.updateOrderStatusService = updateOrderStatusService;
const updateOrder = async (id, data) => {
    return prisma.order.update({
        where: { id },
        data: {
            ...data,
            updatedAt: new Date(),
        },
        include: {
            items: true,
        },
    });
};
exports.updateOrder = updateOrder;
const getOrderStatsService = async (options = {}) => {
    const { status, paymentStatus, orderType, startDate, endDate, search, } = options;
    // Base where clause for all queries
    const baseWhere = {};
    // Where clause for paid orders (used in revenue calculations)
    const paidWhere = {
        paymentStatus: 'PAID'
    };
    // Apply filters
    if (status)
        baseWhere.status = status;
    if (paymentStatus)
        baseWhere.paymentStatus = paymentStatus;
    if (orderType)
        baseWhere.orderType = orderType;
    // Apply date filters if provided
    if (startDate || endDate) {
        const dateFilter = {};
        if (startDate)
            dateFilter.gte = new Date(startDate);
        if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            dateFilter.lte = end;
        }
        baseWhere.createdAt = dateFilter;
        paidWhere.createdAt = { ...dateFilter };
    }
    // Apply search if provided
    if (search) {
        baseWhere.OR = [
            { orderNumber: { contains: search, mode: 'insensitive' } },
            { customerName: { contains: search, mode: 'insensitive' } },
            { customerEmail: { contains: search, mode: 'insensitive' } },
            { customerPhone: { contains: search, mode: 'insensitive' } },
            { tableNumber: { contains: search, mode: 'insensitive' } },
        ];
    }
    const [totalOrders, totalRevenue, ordersByStatus, revenueByStatus, paymentStatusCounts, recentOrders,] = await Promise.all([
        // Total orders
        prisma.order.count({ where: baseWhere }),
        // Total revenue (only from paid orders)
        prisma.order.aggregate({
            where: paidWhere,
            _sum: {
                total: true,
            },
        }),
        // Orders by status
        prisma.order.groupBy({
            by: ['status'],
            where: baseWhere,
            _count: {
                status: true,
            },
        }),
        // Revenue by status (only from paid orders)
        prisma.order.groupBy({
            by: ['status'],
            where: paidWhere,
            _sum: {
                total: true,
            },
        }),
        // Payment status counts
        prisma.order.groupBy({
            by: ['paymentStatus'],
            where: baseWhere,
            _count: {
                paymentStatus: true,
            },
        }),
        // Recent orders
        prisma.order.findMany({
            where: baseWhere,
            take: 5,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                items: true,
            },
        }),
    ]);
    // Format the data
    const ordersByStatusMap = ordersByStatus.reduce((acc, { status, _count }) => ({
        ...acc,
        [status]: _count.status,
    }), {});
    const revenueByStatusMap = revenueByStatus.reduce((acc, { status, _sum }) => ({
        ...acc,
        [status]: _sum.total || 0,
    }), {});
    const paymentStatusMap = paymentStatusCounts.reduce((acc, { paymentStatus, _count }) => ({
        ...acc,
        [paymentStatus || 'UNKNOWN']: _count.paymentStatus,
    }), {});
    // Format recent orders to match the getOrders response
    const formattedRecentOrders = recentOrders.map(order => ({
        ...order,
        createdBy: order.createdBy ? {
            id: order.createdBy.id,
            name: order.createdBy.name || '',
            email: order.createdBy.email || '',
        } : null,
        items: order.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.total,
        })),
    }));
    return {
        data: {
            totalOrders,
            totalRevenue: totalRevenue._sum.total || 0,
            ordersByStatus: ordersByStatusMap,
            revenueByStatus: revenueByStatusMap,
            paymentStatus: paymentStatusMap,
            recentOrders: formattedRecentOrders,
        },
        meta: {
            // Include pagination metadata for consistency
            total: totalOrders,
            page: 1,
            pageSize: totalOrders, // Since we're not paginating stats
            totalPages: 1,
        },
    };
};
exports.getOrderStatsService = getOrderStatsService;
const updatePaymentStatusService = async (id, paymentStatus, paymentMethod) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!order) {
            throw new Error('Order not found');
        }
        // Update the order with new payment status and method
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                paymentStatus,
                paymentMethod,
                // If payment is marked as PAID, update the status to COMPLETED if it's not already
                ...(paymentStatus === 'PAID' && order.status !== 'COMPLETED' ? { status: 'COMPLETED' } : {}),
            },
            include: { items: true },
        });
        // Create a payment record
        if (paymentStatus === 'PAID') {
            await prisma.payment.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    orderId: id,
                    amount: order.total,
                    method: paymentMethod,
                    status: 'PAID',
                },
            });
        }
        return updatedOrder;
    }
    catch (error) {
        console.error('Error updating payment status:', error);
        throw new Error('Failed to update payment status');
    }
};
exports.updatePaymentStatusService = updatePaymentStatusService;
const deleteOrderService = async (id) => {
    return prisma.order.delete({ where: { id } });
};
exports.deleteOrderService = deleteOrderService;
//# sourceMappingURL=order.service.js.map