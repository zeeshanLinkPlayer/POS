import { Request, Response } from 'express';
import { DashboardService, DashboardStats } from './dashboard.service';
import { createRouteHandler } from '../../utils/route-handler';

// Validation function for period parameter
const validatePeriod = (period: unknown): 'day' | 'week' | 'month' => {
  if (period === 'day' || period === 'week' || period === 'month') {
    return period;
  }
  return 'day';
};

export const DashboardController = {
  getDashboardStats: createRouteHandler(async (req: Request, res: Response) => {
    const period = validatePeriod(req.query.period);
    const stats = await DashboardService.getDashboardStats(period);
    return res.json({
      success: true,
      data: stats,
    });
  }),

  // Add more controller methods as needed
};

// Routes are now handled by the main router

export default DashboardController;
