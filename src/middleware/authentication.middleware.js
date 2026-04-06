import userRepository from '../modules/users/user.repository.js';
import AppError from '../utils/app.error.js';

function authenticate(req, res, next) {


  /*
    replace email for testing protected routes
  
    milan@gmail.com   - admin   - full access (users, records, insights)
    sana@gmail.com    - analyst - records + insights, no user management
    shreyas@gmail.com - viewer  - read-only, dashboard view only
  */
  const email = 'milan@gmail.com';

  const user = userRepository.findUserByEmail(email);
  if (!user) {
    throw new AppError('user not found', 404);
  }

  req.user = user;
  next();
}

export default authenticate;