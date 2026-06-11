import db from '../../../config/db.js';

async function insertRecord(record) {
  const query = `
    INSERT INTO financial_records (amount, type, category, record_date, note, created_by)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, amount, type, category, record_date, note, created_by, created_at, updated_at
  `;

  const values = [
    record.amount,
    record.type,
    record.category,
    record.record_date,
    record.note,
    record.created_by
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function getRecords(filters) {
  let query = `
    SELECT r.id, r.amount, r.type, r.category, r.record_date, r.note, u.name AS created_by, r.created_at, r.updated_at
    FROM financial_records AS r
    JOIN users AS u ON r.created_by = u.id
    WHERE 1=1
  `;

  const values = [];

  if (filters.type) {
    values.push(filters.type);
    query += ` AND r.type = $${values.length} `;
  }

  if (filters.category) {
    values.push(filters.category);
    query += ` AND r.category = $${values.length} `;
  }

  if (filters.from && filters.to) {
    values.push(filters.from);
    query += ` AND r.record_date >= $${values.length} `;

    values.push(filters.to);
    query += ` AND r.record_date <= $${values.length} `;
  }

  values.push(filters.limit);
  query += ` LIMIT $${values.length} `;

  values.push(filters.offset);
  query += ` OFFSET $${values.length} `;

  const result = await db.query(query, values);
  return result.rows;
}

async function getRecordById(id) {
  const query = `
    SELECT r.id, r.amount, r.type, r.category, r.record_date, r.note, u.name AS created_by, r.created_at, r.updated_at
    FROM financial_records AS r
    JOIN users AS u ON r.created_by = u.id
    WHERE r.id = $1
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
}

async function updateRecord(record) {
  const fields = [];
  const values = [];

  if (record.amount != null) {
    values.push(record.amount);
    fields.push(`amount = $${values.length}`);
  }

  if (record.type) {
    values.push(record.type);
    fields.push(`type = $${values.length}`);
  }

  if (record.category) {
    values.push(record.category);
    fields.push(`category = $${values.length}`);
  }

  if (record.record_date) {
    values.push(record.record_date);
    fields.push(`record_date = $${values.length}`);
  }

  if (record.note) {
    values.push(record.note);
    fields.push(`note = $${values.length}`);
  }

  values.push(record.id);

  const query = `
    UPDATE financial_records
    SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${values.length}
    RETURNING id, amount, type, category, record_date, note, created_by, created_at, updated_at
  `;

  const result = await db.query(query, values);
  return result.rows[0];
}

async function deleteRecord(id) {
  const query = `
    DELETE FROM financial_records
    WHERE id = $1
    RETURNING id
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
}

const recordRepository = {
  insertRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord
};

export default recordRepository;