import recordRepository from './record.repository.js';
import AppError from '../../utils/app.error.js';
import userRepository from '../users/user.repository.js';
import convertMoney from '../../utils/money.js';

class RecordService {

  async createRecord({ amount, type, category, record_date, note, created_by }) {
    const userExists = userRepository.getUserById(created_by);
    if (!userExists) {
      throw new AppError('user not found', 404);
    }
    const amountInPaise = convertMoney.rupeesToPaise(amount);
    const result = recordRepository.insertRecord({ amountInPaise, type, category, record_date, note, created_by });
    return { id: result.lastInsertRowid, amount, type, category, record_date, note, created_by: userExists.name };
  }
}


export default new RecordService();