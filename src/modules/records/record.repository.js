import db from '../../../config/db.js';

function insertRecord(record) {
  const stmt = db.prepare(`
  INSERT INTO financial_records(amount, type, category, record_date, note, created_by) VALUES(?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(record.amountInPaise, record.type, record.category, record.record_date, record.note, record.created_by);
}

function getRecords(filters) {
  let query = `
    SELECT r.id, r.amount, r.type, r.category, r.record_date, r.note, u.name AS created_by, r.created_at, r.updated_at
    FROM financial_records AS r
    JOIN users AS u ON r.created_by = u.id
    WHERE 1=1
    `;
  const parameters = [];

  if (filters.type) {
    query += ` AND r.type = ? `;
    parameters.push(filters.type);
  }

  if (filters.category) {
    query += ` AND r.category = ? `;
    parameters.push(filters.category);
  }

  if (filters.from && filters.to) {
    query += ` AND r.record_date BETWEEN ? AND ? `;
    parameters.push(filters.from, filters.to);
  }

  query += `LIMIT ? OFFSET ?`
  parameters.push(filters.limit, filters.offset);

  const stmt = db.prepare(query);
  return stmt.all(...parameters);
}

function getRecordById(id) {
  const stmt = db.prepare(`
    SELECT r.id, r.amount, r.type, r.category, r.record_date, r.note, u.name AS created_by, r.created_at, r.updated_at
    FROM financial_records AS r
    JOIN users AS u ON r.created_by = u.id  
    WHERE r.id = ?
    `);
  return stmt.get(id);
}

const recordRepository = {
  insertRecord,
  getRecords,
  getRecordById
}

export default recordRepository;