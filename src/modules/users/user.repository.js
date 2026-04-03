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


const userRepository = {
  insertUser,
  findUserByEmail
};

export default userRepository;