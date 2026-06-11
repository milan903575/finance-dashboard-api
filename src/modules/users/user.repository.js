import db from '../../../config/db.js';

async function insertUser(user) {
  const query = `
    INSERT INTO users (name, email, password_hash, role_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role_id, is_active, created_at, updated_at
  `;

  const values = [user.name, user.email, user.password_hash, user.role_id];
  const result = await db.query(query, values);
  return result.rows[0];
}

async function findUserByEmail(email) {
  const query = `
    SELECT id, email, password_hash
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(query, [email]);
  return result.rows[0];
}

async function getUsers() {
  const query = `
    SELECT u.id, u.name, u.email, u.is_active AS status, u.created_at, u.updated_at, r.name AS role
    FROM users AS u
    JOIN roles AS r ON u.role_id = r.id
  `;

  const result = await db.query(query);
  return result.rows;
}

async function getUserById(id) {
  const query = `
    SELECT u.id, u.name, u.email, u.is_active AS status, u.created_at, u.updated_at, r.name AS role
    FROM users AS u
    JOIN roles AS r ON u.role_id = r.id
    WHERE u.id = $1
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
}

async function updateUserRole(id, role_id) {
  const query = `
    UPDATE users
    SET role_id = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING id, name, email, role_id, is_active, created_at, updated_at
  `;

  const result = await db.query(query, [role_id, id]);
  return result.rows[0];
}

async function updateUserStatus(id, status) {
  const query = `
    UPDATE users
    SET is_active = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING id, name, email, role_id, is_active, created_at, updated_at
  `;

  const result = await db.query(query, [status, id]);
  return result.rows[0];
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