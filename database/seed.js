import db from '../config/db.js';

function seedRoles() {
  const stmt = db.prepare(`
    INSERT INTO roles(name, description) VALUES(?, ?)
    `);
  stmt.run('viewer', 'Can only view dashboard data');
  stmt.run('analyst', 'Can view records and access insights');
  stmt.run('admin', 'Full management access');
}

function seedUsers() {
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash, role_id, is_active)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run('Milan', 'milan@gmail.com', 'milan123', 3, 1);
  stmt.run('Sana', 'sana@gmail.com', 'sana123', 2, 1);
  stmt.run('Shreyas', 'shreyas@gmail.com', 'shreyas123', 1, 0);
}

function seedRecords() {
  const stmt = db.prepare(`
    INSERT INTO financial_records (amount, type, category, record_date, note, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(85000, 'income', 'salary', '2024-01-01', 'January salary', 1);
  stmt.run(25000, 'expense', 'rent', '2024-01-05', 'Monthly rent', 1);
  stmt.run(8500, 'expense', 'groceries', '2024-01-10', null, 1);
  stmt.run(18000, 'income', 'freelance', '2024-01-15', 'Logo design project', 1);
  stmt.run(3200, 'expense', 'utilities', '2024-01-18', 'Electricity bill', 1);
  stmt.run(85000, 'income', 'salary', '2024-02-01', 'February salary', 1);
  stmt.run(25000, 'expense', 'rent', '2024-02-05', null, 1);
  stmt.run(7200, 'expense', 'groceries', '2024-02-08', null, 1);
  stmt.run(12000, 'income', 'freelance', '2024-02-12', 'Banner design', 1);
  stmt.run(2400, 'expense', 'transport', '2024-02-15', 'Cab fares', 1);
  stmt.run(85000, 'income', 'salary', '2024-03-01', 'March salary', 1);
  stmt.run(25000, 'expense', 'rent', '2024-03-05', null, 1);
  stmt.run(9100, 'expense', 'groceries', '2024-03-09', null, 1);
  stmt.run(35000, 'income', 'freelance', '2024-03-14', 'Website redesign', 1);
  stmt.run(4800, 'expense', 'utilities', '2024-03-17', 'Water + electricity', 1);
  stmt.run(11000, 'expense', 'health', '2024-03-20', 'Doctor visit', 1);
  stmt.run(50000, 'income', 'bonus', '2024-03-25', 'Q1 performance bonus', 1);
  stmt.run(3600, 'expense', 'transport', '2024-03-26', null, 1);
  stmt.run(15000, 'expense', 'entertainment', '2024-03-28', 'Team outing', 1);
  stmt.run(22000, 'income', 'freelance', '2024-03-30', 'Social media assets', 1);
}

try {
  seedRoles();
  seedUsers();
  seedRecords();
  console.log('data inserted sucessfully');
} catch (error) {
  console.error(`seed failed: ${error}`);
}
