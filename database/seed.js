import db from '../config/db.js';

function seedRoles() {
  const stmt = db.prepare(`
    INSERT INTO roles(name, description) VALUES(?, ?)
    `);
  stmt.run('viewer', 'Can only view dashboard data');
  stmt.run('analyst', 'Can view records and access insights');
  stmt.run('admin', 'Full management access');
}

try {
  seedRoles();
  console.log('Data inserted sucessfully');
} catch (error) {
  console.error(`Seed Data Failed ${error}`);
}
