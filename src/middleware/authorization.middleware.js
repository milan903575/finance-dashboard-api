import userRepository from '../modules/users/user.repository.js';
import AppError from '../utils/app.error.js';

function authorize(...roles) {
  return (req, res, next) => {
    const userId = 1
    const userRoleDB = userRepository.getUserById(userId);
    if (!roles.includes(userRoleDB.role)) {
      throw new AppError('you dont have access', 403);
    }
    next();
  };
}

export default authorize;