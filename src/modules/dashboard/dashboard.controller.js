import DashboardService from './dashboard.service.js';
import { sendSuccess } from '../../utils/response.helper.js';


async function getDashboardSummary(req, res, next) {
  try {
    const summary = await DashboardService.getDashboardSummary();
    sendSuccess(res, 200, summary, 'summary fetched successfully');
  } catch (error) {
    next(error);
  }
}

async function getCategoryTotals(req, res, next) {
  try {
    const categoryTotals = await DashboardService.getCategoryTotals();
    sendSuccess(res, 200, categoryTotals, 'category totals fetched successfully');
  } catch (error) {
    next(error);
  }
}

async function getMonthlyTrends(req, res, next) {
  try {
    const monthlyTrends = await DashboardService.getMonthlyTrends();
    sendSuccess(res, 200, monthlyTrends, 'monthly trends fetched successfully');
  } catch (error) {
    next(error);
  }
}

async function getRecentActivity(req, res, next) {
  try {
    const recentActivities = await DashboardService.getRecentActivity();
    sendSuccess(res, 200, recentActivities, 'recent activity fetched successfully');
  } catch (error) {
    next(error);
  }
}

const dashboardController = {
  getDashboardSummary,
  getCategoryTotals,
  getMonthlyTrends,
  getRecentActivity
}

export default dashboardController;