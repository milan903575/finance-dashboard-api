import db from '../../../config/db.js';

function insertRecord(record) {
  const stmt = db.prepare(`
  INSERT INTO financial_records(amount, type, category, record_date, note, created_by) VALUES(?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(record.amountInPaise, record.type, record.category, record.record_date, record.note, record.created_by);
}

const recordRepository = {
  insertRecord,
}

export default recordRepository;