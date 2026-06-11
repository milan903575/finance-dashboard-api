import db from '../config/db.js';

async function createRolesTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name TEXT NOT NULL UNIQUE,
      description TEXT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function createUsersTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role_id INTEGER NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (role_id) REFERENCES roles(id)
    )
  `);
}

async function createRecordsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS financial_records (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      amount INTEGER NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
      category TEXT NOT NULL,
      record_date DATE NOT NULL,
      note TEXT DEFAULT NULL,
      created_by INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);
}

async function createIndexes() {
  await db.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
  await db.query(`CREATE INDEX IF NOT EXISTS idx_records_type ON financial_records(type)`);
  await db.query(`CREATE INDEX IF NOT EXISTS idx_records_date ON financial_records(record_date)`);
  await db.query(`CREATE INDEX IF NOT EXISTS idx_records_category ON financial_records(category)`);
}

const runMigrations = async () => {
  try {
    await createRolesTable();
    await createUsersTable();
    await createRecordsTable();
    await createIndexes();
    console.log('all tables created and indexes successfully');
  } catch (error) {
    console.error(`migration failed: ${error.message}`);
  }
};

runMigrations();