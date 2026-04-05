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

const dashboardController = {
  getDashboardSummary
}

export default dashboardController;