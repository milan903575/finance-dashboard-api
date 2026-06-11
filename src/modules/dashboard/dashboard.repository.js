import db from '../../../config/db.js';

async function getDashboardSummary() {
  const query = `
    SELECT
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense
    FROM financial_records
  `;

  const result = await db.query(query);
  return result.rows[0];
}

async function getCategoryTotals() {
  const query = `
    SELECT category, type, COALESCE(SUM(amount), 0) AS total
    FROM financial_records
    GROUP BY category, type
    ORDER BY total DESC
  `;

  const result = await db.query(query);
  return result.rows;
}

async function getMonthlyTrends() {
  const query = `
    SELECT
      TO_CHAR(record_date, 'YYYY-MM') AS month,
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense
    FROM financial_records
    GROUP BY TO_CHAR(record_date, 'YYYY-MM')
    ORDER BY month DESC
  `;

  const result = await db.query(query);
  return result.rows;
}

async function getRecentActivity() {
  const query = `
    SELECT r.id, r.amount, r.type, r.category, r.record_date, r.note, u.name AS created_by
    FROM financial_records AS r
    JOIN users AS u ON r.created_by = u.id
    ORDER BY r.created_at DESC
    LIMIT 5
  `;

  const result = await db.query(query);
  return result.rows;
}

const dashboardRepository = {
  getDashboardSummary,
  getCategoryTotals,
  getMonthlyTrends,
  getRecentActivity
};

export default dashboardRepository;