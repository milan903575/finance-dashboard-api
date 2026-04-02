import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const dbPath = path.join(dirName, '../database/finance.db');

const db = new Database(dbPath);

export default db;