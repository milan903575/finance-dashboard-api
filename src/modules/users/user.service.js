import userRepository from './user.repository.js';
import AppError from '../../utils/app.error.js';
import bcrypt from 'bcrypt';

class UserService {
  async createUser({ name, email, password, role_id }) {
    const emailExists = userRepository.findUserByEmail(email);
    if (emailExists) {
      throw new AppError('email already exists', 409);
    }
    const password_hash = await bcrypt.hash(password, 10);
    const result = userRepository.insertUser({ name, email, password_hash, role_id });
    return { id: result.lastInsertRowid, name, email, role_id };
  }

  async getUsers() {
    const users = userRepository.getUsers();
    return users;
  }

  async getUser(id) {
    const user = userRepository.getUserById(id);
    if (!user) {
      throw new AppError('user not found', 404);
    }
    return user;
  }
}

export default new UserService();