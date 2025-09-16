"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
exports.DashboardService = {
    async getDashboardStats(period = 'day') {
        const now = new Date();
        let startDate;
        switch (period) {
            case 'day':
                startDate = (0, date_fns_1.startOfDay)(now);
                break;
            case 'week':
                startDate = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(now, 7));
                break;
            case 'month':
                startDate = (0, date_fns_1.startOfDay)((0, date_fns_1.subMonths)(now, 1));
                break;
            default:
                startDate = (0, date_fns_1.startOfDay)(now);
        }
        // Get total revenue from COMPLETED orders only
        const revenueResult = await prisma.order.aggregate({
            where: {
                paymentStatus: "PAID",
                createdAt: { gte: startDate },
            },
            _sum: { total: true },
        });
        // Get total orders
        const totalOrders = await prisma.order.count({
            where: {
                createdAt: { gte: startDate },
            },
        });
        // Get average order value from all orders
        const allOrders = await prisma.order.aggregate({
            where: {
                createdAt: { gte: startDate },
            },
            _avg: { total: true },
            _count: true,
        });
        // Get new customers
        const newCustomers = await prisma.user.count({
            where: {
                createdAt: { gte: startDate },
                role: client_1.UserRole.USER,
            },
        });
        // Get popular items
        const popularItems = await prisma.$queryRaw `
      SELECT 
        mi.id as "menuItemId",
        mi.name as name,
        COUNT(oi.id)::int as count
      FROM "OrderItem" oi
      JOIN "MenuItem" mi ON oi."menuItemId" = mi.id
      JOIN "Order" o ON oi."orderId" = o.id
      WHERE o."createdAt" >= ${startDate}
      GROUP BY mi.id, mi.name
      ORDER BY count DESC
      LIMIT 5
    `;
        // Get recent orders
        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                total: true,
                status: true,
                createdAt: true,
            },
        });
        // Get revenue data for charts
        const revenueData = await this.getRevenueData(startDate, now);
        // Get order trends for charts
        const orderTrends = await this.getOrderTrends(startDate, now);
        return {
            totalRevenue: Number(revenueResult._sum.total) || 0,
            totalOrders,
            averageOrderValue: totalOrders > 0 ? (Number(revenueResult._sum.total) / totalOrders) : 0,
            newCustomers,
            popularItems: popularItems.map((item) => ({
                name: item.name || 'Unknown',
                orders: item.count,
            })),
            recentOrders: recentOrders.map((order) => ({
                id: order.id,
                total: Number(order.total),
                status: order.status,
                createdAt: order.createdAt,
            })),
            revenueData,
            orderTrends,
        };
    },
    async getRevenueData(startDate, endDate) {
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const revenueData = [];
        for (let i = 0; i <= days; i++) {
            const dayStart = new Date(startDate);
            dayStart.setDate(dayStart.getDate() + i);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(dayStart);
            dayEnd.setHours(23, 59, 59, 999);
            const result = await prisma.order.aggregate({
                where: {
                    status: client_1.OrderStatus.COMPLETED,
                    createdAt: {
                        gte: dayStart,
                        lte: dayEnd,
                    },
                },
                _sum: { total: true },
            });
            revenueData.push({
                date: (0, date_fns_1.format)(dayStart, 'MMM d'),
                revenue: Number(result._sum.total) || 0,
            });
        }
        return revenueData;
    },
    async getOrderTrends(startDate, endDate) {
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const orderTrends = [];
        for (let i = 0; i <= days; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const dayStart = (0, date_fns_1.startOfDay)(currentDate);
            const dayEnd = (0, date_fns_1.endOfDay)(currentDate);
            const count = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: dayStart,
                        lte: dayEnd,
                    },
                },
            });
            orderTrends.push({
                date: (0, date_fns_1.format)(dayStart, 'MMM dd'),
                count,
            });
        }
        return orderTrends;
    },
};
exports.default = exports.DashboardService;
//# sourceMappingURL=dashboard.service.js.map