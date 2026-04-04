import db from '../../../config/db.js';

function insertUser(user) {
  const stmt = db.prepare(`
  INSERT INTO users(name, email, password_hash, role_id) values (?, ?, ?, ?)
  `);
  return stmt.run(user.name, user.email, user.password_hash, user.role_id);
}

function findUserByEmail(email) {
  const stmt = db.prepare(`
    SELECT email 
    FROM users
    WHERE email = ?
    `);
  return stmt.get(email);
}

function getUsers() {
  const stmt = db.prepare(`
    SELECT u.id, u.name, u.email, r.name as role
    FROM users AS u
    JOIN roles AS r ON u.role_id = r.id
    `);
  return stmt.all();
}

function getUserById(id) {
  const stmt = db.prepare(`
    SELECT u.id, u.name, u.email, r.name as role
    FROM users AS u
    JOIN roles AS r ON u.role_id = r.id
    WHERE u.id = ?
    `);
  return stmt.get(id);
}

const userRepository = {
  insertUser,
  findUserByEmail,
  getUsers,
  getUserById
};

export default userRepository;