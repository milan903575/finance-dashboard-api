import userRepository from './user.repository.js';
import AppError from '../../utils/app.error.js';
import bcrypt from 'bcrypt';

class UserService {
  async createUser({ name, email, password, role_id }) {
    const emailExists = await userRepository.findUserByEmail(email);

    if (emailExists) {
      throw new AppError('email already exists', 409);
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await userRepository.insertUser({
      name,
      email,
      password_hash,
      role_id
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id
    };
  }

  async getUsers() {
    const users = await userRepository.getUsers();
    return users;
  }

  async getUser(id) {
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new AppError('user not found', 404);
    }

    return user;
  }

  async updateUserRole(id, role_id) {
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new AppError('user not found', 404);
    }

    const updatedUser = await userRepository.updateUserRole(id, role_id);
    return updatedUser;
  }

  async updateUserStatus(id, status) {
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new AppError('user not found', 404);
    }

    const updatedUser = await userRepository.updateUserStatus(id, status);
    return updatedUser;
  }
}

export default new UserService();