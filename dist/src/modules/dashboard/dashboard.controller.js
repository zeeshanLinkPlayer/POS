"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
const route_handler_1 = require("../../utils/route-handler");
// Validation function for period parameter
const validatePeriod = (period) => {
    if (period === 'day' || period === 'week' || period === 'month') {
        return period;
    }
    return 'day';
};
exports.DashboardController = {
    getDashboardStats: (0, route_handler_1.createRouteHandler)(async (req, res) => {
        const period = validatePeriod(req.query.period);
        const stats = await dashboard_service_1.DashboardService.getDashboardStats(period);
        return res.json({
            success: true,
            data: stats,
        });
    }),
    // Add more controller methods as needed
};
// Routes are now handled by the main router
exports.default = exports.DashboardController;
//# sourceMappingURL=dashboard.controller.js.map