import db from '../config/db.js';

function createRolesTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS roles(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `)
}

function createUsersTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(role_id) REFERENCES roles(id)
    );
    `);
}

function createRecordsTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS financial_records(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount INTEGER NOT NULL,
    type TEXT NOT NULL CHECK(type IN('income','expense')),
    category TEXT NOT NULL,
    record_date TEXT NOT NULL,
    note TEXT DEFAULT NULL,
    created_by INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
    );
    `);
}

function createIndexes() {
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_records_type ON financial_records(type);
    CREATE INDEX IF NOT EXISTS idx_records_date ON financial_records(record_date);
    CREATE INDEX IF NOT EXISTS idx_records_category ON financial_records(category);
    `);
}

const runMigrations = () => {
  try {
    createRolesTable();
    createUsersTable();
    createRecordsTable();
    createIndexes();
    console.log('all tables created and index successfully');
  }
  catch (error) {
    console.error(`migration failed: ${error.message}`);
  }
};

runMigrations();