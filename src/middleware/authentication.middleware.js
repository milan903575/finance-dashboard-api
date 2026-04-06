import userRepository from '../modules/users/user.repository.js';
import AppError from '../utils/app.error.js';

function authenticate(req, res, next) {

  const email = 'Milan@gmail.com';

  const user = userRepository.findUserByEmail(email);
  if (!user) {
    throw new AppError('user not found', 404);
  }

  req.user = user;
  next();
}

export default authenticate;