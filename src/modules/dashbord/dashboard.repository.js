import db from '../../../config/db.js';

function getDashboardSummary() {
  const stmt = db.prepare(`
    SELECT SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income, SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
    FROM financial_records
    `);

  return stmt.get();
}

const dashboardRepository = {
  getDashboardSummary
}

export default dashboardRepository;