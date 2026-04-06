import dashboardRepository from './dashboard.repository.js';
import convertMoney from '../../utils/money.js';


class DashboardService {

  async getDashboardSummary() {
    const summary = dashboardRepository.getDashboardSummary();
    const { total_income, total_expense } = summary;
    const netBalance = total_income - total_expense;

    return {
      total_income: convertMoney.paiseToRupees(total_income),
      total_expense: convertMoney.paiseToRupees(total_expense),
      net_balance: convertMoney.paiseToRupees(netBalance)
    };

  }

  async getCategoryTotals() {
    const categoryTotals = dashboardRepository.getCategoryTotals();

    const filteredResult = categoryTotals.map((categoryTotal) => {
      return {
        ...categoryTotal,
        total: convertMoney.paiseToRupees(categoryTotal.total)
      };
    });

    return filteredResult;
  }

  async getMonthlyTrends() {
    const monthlyTrends = dashboardRepository.getMonthlyTrends();

    const filteredResult = monthlyTrends.map((monthlyTrend) => {
      const netBalance = monthlyTrend.total_income - monthlyTrend.total_expense;
      return {
        month: monthlyTrend.month,
        total_income: convertMoney.paiseToRupees(monthlyTrend.total_income),
        total_expense: convertMoney.paiseToRupees(monthlyTrend.total_expense),
        net_balance: convertMoney.paiseToRupees(netBalance)
      };
    });

    return filteredResult;
  }

  async getRecentActivity() {
    const recentActivities = dashboardRepository.getRecentActivity();

    const filteredResult = recentActivities.map((recentActivity) => {
      return {
        ...recentActivity,
        amount: convertMoney.paiseToRupees(recentActivity.amount)
      };
    });

    return filteredResult;
  }

}

export default new DashboardService();