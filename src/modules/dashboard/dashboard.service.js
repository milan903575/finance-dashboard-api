import dashboardRepository from './dashboard.repository.js';
import convertMoney from '../../utils/money.js';

class DashboardService {
  async getDashboardSummary() {
    const summary = await dashboardRepository.getDashboardSummary();

    const totalIncome = Number(summary.total_income);
    const totalExpense = Number(summary.total_expense);
    const netBalance = totalIncome - totalExpense;

    return {
      total_income: convertMoney.paiseToRupees(totalIncome),
      total_expense: convertMoney.paiseToRupees(totalExpense),
      net_balance: convertMoney.paiseToRupees(netBalance)
    };
  }

  async getCategoryTotals() {
    const categoryTotals = await dashboardRepository.getCategoryTotals();

    return categoryTotals.map((categoryTotal) => ({
      ...categoryTotal,
      total: convertMoney.paiseToRupees(Number(categoryTotal.total))
    }));
  }

  async getMonthlyTrends() {
    const monthlyTrends = await dashboardRepository.getMonthlyTrends();

    return monthlyTrends.map((monthlyTrend) => {
      const totalIncome = Number(monthlyTrend.total_income);
      const totalExpense = Number(monthlyTrend.total_expense);
      const netBalance = totalIncome - totalExpense;

      return {
        month: monthlyTrend.month,
        total_income: convertMoney.paiseToRupees(totalIncome),
        total_expense: convertMoney.paiseToRupees(totalExpense),
        net_balance: convertMoney.paiseToRupees(netBalance)
      };
    });
  }

  async getRecentActivity() {
    const recentActivities = await dashboardRepository.getRecentActivity();

    return recentActivities.map((recentActivity) => ({
      ...recentActivity,
      amount: convertMoney.paiseToRupees(Number(recentActivity.amount))
    }));
  }
}

export default new DashboardService();