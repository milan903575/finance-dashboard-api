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

  async getRecords({ type, category, from, to, page, limit }) {
    const offset = (page - 1) * limit;
    const records = recordRepository.getRecords({ type, category, from, to, offset, limit });

    const filteredResult = records.map((record) => {
      return {
        id: record.id,
        amount: convertMoney.paiseToRupees(record.amount),
        type: record.type,
        category: record.category,
        record_date: record.record_date,
        created_by: record.created_by,
        created_at: record.created_at,
        updated_at: record.updated_at
      };
    });
    return filteredResult;
  }


}


export default new RecordService();