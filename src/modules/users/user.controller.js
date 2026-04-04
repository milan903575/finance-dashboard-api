import UserService from './user.service.js';
import { sendSuccess } from '../../utils/response.helper.js';

async function createUser(req, res, next) {
  try {
    const { name, email, password, role_id } = req.body;
    const user = await UserService.createUser({ name, email, password, role_id });
    sendSuccess(res, 201, user, 'user created successfully');
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await UserService.getUsers();
    sendSuccess(res, 200, users, 'users fetched successfully');
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    sendSuccess(res, 200, user, 'user fetched successfully');
  } catch (error) {
    next(error);
  }
}

async function updateUserRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role_id } = req.body;
    const user = await UserService.updateUserRole(id, role_id);
    sendSuccess(res, 200, user, 'user role updated successfully');
  } catch (error) {
    next(error);
  }
}

async function updateUserStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await UserService.updateUserStatus(id, status);
    sendSuccess(res, 200, user, 'user status updated successfully');
  } catch (error) {
    next(error);
  }
}

const userController = {
  createUser,
  getUsers,
  getUser,
  updateUserRole,
  updateUserStatus
}

export default userController;