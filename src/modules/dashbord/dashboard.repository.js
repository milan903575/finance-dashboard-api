import db from '../../../config/db.js';

function getDashboardSummary() {
  const stmt = db.prepare(`
    SELECT SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income, SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
    FROM financial_records
    `);

  return stmt.get();
}

function getCategoryTotals() {
  const stmt = db.prepare(`
    SELECT category, type, COALESCE(SUM(amount), 0) AS total
    FROM financial_records
    GROUP BY category, type
    ORDER BY total DESC
    `);

  return stmt.all();
}

const dashboardRepository = {
  getDashboardSummary,
  getCategoryTotals
}

export default dashboardRepository;