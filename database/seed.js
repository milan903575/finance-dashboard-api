import db from '../config/db.js';
import bcrypt from 'bcrypt';

async function seedRoles() {
  await db.query(`
    INSERT INTO roles (name, description)
    VALUES
      ($1, $2),
      ($3, $4),
      ($5, $6)
    ON CONFLICT (name) DO NOTHING
  `, [
    'viewer', 'Can only view dashboard data',
    'analyst', 'Can view records and access insights',
    'admin', 'Full management access'
  ]);
}

async function seedUsers() {
  const milanPassword = await bcrypt.hash('milan123', 10);
  const sanaPassword = await bcrypt.hash('sana123', 10);
  const shreyasPassword = await bcrypt.hash('shreyas123', 10);

  await db.query(`
    INSERT INTO users (name, email, password_hash, role_id, is_active)
    VALUES
      ($1, $2, $3, $4, $5),
      ($6, $7, $8, $9, $10),
      ($11, $12, $13, $14, $15)
    ON CONFLICT (email) DO NOTHING
  `, [
    'Milan', 'milan@gmail.com', milanPassword, 3, true,
    'Sana', 'sana@gmail.com', sanaPassword, 2, true,
    'Shreyas', 'shreyas@gmail.com', shreyasPassword, 1, false
  ]);
}

async function seedRecords() {
  await db.query(`
    INSERT INTO financial_records (amount, type, category, record_date, note, created_by)
    VALUES
      ($1, $2, $3, $4, $5, $6),
      ($7, $8, $9, $10, $11, $12),
      ($13, $14, $15, $16, $17, $18),
      ($19, $20, $21, $22, $23, $24),
      ($25, $26, $27, $28, $29, $30),
      ($31, $32, $33, $34, $35, $36),
      ($37, $38, $39, $40, $41, $42),
      ($43, $44, $45, $46, $47, $48),
      ($49, $50, $51, $52, $53, $54),
      ($55, $56, $57, $58, $59, $60),
      ($61, $62, $63, $64, $65, $66),
      ($67, $68, $69, $70, $71, $72),
      ($73, $74, $75, $76, $77, $78),
      ($79, $80, $81, $82, $83, $84),
      ($85, $86, $87, $88, $89, $90),
      ($91, $92, $93, $94, $95, $96),
      ($97, $98, $99, $100, $101, $102),
      ($103, $104, $105, $106, $107, $108),
      ($109, $110, $111, $112, $113, $114),
      ($115, $116, $117, $118, $119, $120)
  `, [
    85000, 'income', 'salary', '2024-01-01', 'January salary', 1,
    25000, 'expense', 'rent', '2024-01-05', 'Monthly rent', 1,
    8500, 'expense', 'groceries', '2024-01-10', null, 1,
    18000, 'income', 'freelance', '2024-01-15', 'Logo design project', 1,
    3200, 'expense', 'utilities', '2024-01-18', 'Electricity bill', 1,
    85000, 'income', 'salary', '2024-02-01', 'February salary', 1,
    25000, 'expense', 'rent', '2024-02-05', null, 1,
    7200, 'expense', 'groceries', '2024-02-08', null, 1,
    12000, 'income', 'freelance', '2024-02-12', 'Banner design', 1,
    2400, 'expense', 'transport', '2024-02-15', 'Cab fares', 1,
    85000, 'income', 'salary', '2024-03-01', 'March salary', 1,
    25000, 'expense', 'rent', '2024-03-05', null, 1,
    9100, 'expense', 'groceries', '2024-03-09', null, 1,
    35000, 'income', 'freelance', '2024-03-14', 'Website redesign', 1,
    4800, 'expense', 'utilities', '2024-03-17', 'Water + electricity', 1,
    11000, 'expense', 'health', '2024-03-20', 'Doctor visit', 1,
    50000, 'income', 'bonus', '2024-03-25', 'Q1 performance bonus', 1,
    3600, 'expense', 'transport', '2024-03-26', null, 1,
    15000, 'expense', 'entertainment', '2024-03-28', 'Team outing', 1,
    22000, 'income', 'freelance', '2024-03-30', 'Social media assets', 1
  ]);
}

async function runSeed() {
  try {
    await seedRoles();
    await seedUsers();
    await seedRecords();
    console.log('data inserted successfully');
  } catch (error) {
    console.error(`seed failed: ${error.message}`);
  }
}

runSeed();