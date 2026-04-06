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

function getMonthlyTrends() {
  const stmt = db.prepare(`
    SELECT strftime('%Y-%m', record_date) AS month, SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income, SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
    FROM financial_records
    GROUP BY month
    ORDER BY month DESC
    `);

  return stmt.all();
}

function getRecentActivity() {
  const stmt = db.prepare(`
    SELECT r.id, r.amount, r.type, r.category, r.record_date, r.note, u.name AS created_by
    FROM financial_records AS r
    JOIN users AS u ON r.created_by = u.id
    ORDER BY r.created_at DESC
    LIMIT 5
    `);
  return stmt.all()
}

const dashboardRepository = {
  getDashboardSummary,
  getCategoryTotals,
  getMonthlyTrends,
  getRecentActivity
}

export default dashboardRepository;