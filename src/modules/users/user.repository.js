import db from '../../../config/db.js';

function insertUser(user) {
  const stmt = db.prepare(`
  INSERT INTO users(name, email, password_hash, role_id) values (?, ?, ?, ?)
  `);
  return stmt.run(user.name, user.email, user.password_hash, user.role_id);
}

function findUserByEmail(email) {
  const stmt = db.prepare(`
    SELECT id, email, password_hash
    FROM users
    WHERE email = ?
    `);
  return stmt.get(email);
}

function getUsers() {
  const stmt = db.prepare(`
    SELECT u.id, u.name, u.email, u.is_active AS status, u.created_at, u.updated_at , r.name AS role
    FROM users AS u
    JOIN roles AS r ON u.role_id = r.id
    `);
  return stmt.all();
}

function getUserById(id) {
  const stmt = db.prepare(`
    SELECT u.id, u.name, u.email, u.is_active AS status, u.created_at, u.updated_at , r.name AS role
    FROM users AS u
    JOIN roles AS r ON u.role_id = r.id
    WHERE u.id = ?
    `);
  return stmt.get(id);
}

function updateUserRole(id, role_id) {
  const stmt = db.prepare(`
    UPDATE users
    SET role_id = ?, updated_at = datetime('now')
    WHERE id = ?
    `);
  return stmt.run(role_id, id);
}

function updateUserStatus(id, status) {
  const stmt = db.prepare(`
    UPDATE users
    SET is_active = ?, updated_at = datetime('now')
    WHERE id = ?
    `);
  return stmt.run(status, id);
}

const userRepository = {
  insertUser,
  findUserByEmail,
  getUsers,
  getUserById,
  updateUserRole,
  updateUserStatus
};

export default userRepository;