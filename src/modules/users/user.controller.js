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

const userController = {
  createUser
}

export default userController;