import express from 'express';
import dashboardController from './dashboard.controller.js';

const router = express.Router();

router.get('/summary', dashboardController.getDashboardSummary);

router.get('/category-totals', dashboardController.getCategoryTotals);

router.get('/trends', dashboardController.getMonthlyTrends);

export default router;