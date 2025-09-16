import { Router } from 'express';
import { DashboardController } from './dashboard.controller';

const router = Router();

// Dashboard stats route
router.get('/stats', DashboardController.getDashboardStats);

export { router as dashboardRouter };
