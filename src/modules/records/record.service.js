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

    const result = recordRepository.insertRecord({
      amount: convertMoney.rupeesToPaise(amount),
      type,
      category,
      record_date,
      note,
      created_by
    });

    return {
      id: result.lastInsertRowid,
      amount: convertMoney.paiseToRupees(amountInPaise),
      type,
      category,
      record_date,
      note,
      created_by: userExists.name
    };
  }

  async getRecords({ type, category, from, to, page, limit }) {
    const offset = (page - 1) * limit;
    const records = recordRepository.getRecords({ type, category, from, to, offset, limit });

    const filteredResult = records.map((record) => {
      return {
        ...record,
        amount: convertMoney.paiseToRupees(record.amount)
      };
    });

    return filteredResult;
  }

  async getRecord(id) {
    const record = recordRepository.getRecordById(id);

    if (!record) {
      throw new AppError('record not found', 404);
    }

    return {
      ...record,
      amount: convertMoney.paiseToRupees(record.amount)
    }
  }

  async updateRecord({ id, amount, type, category, record_date, note }) {
    const record = recordRepository.getRecordById(id);

    if (!record) {
      throw new AppError('record not found', 404);
    }

    const amountInPaise = amount !== undefined ? convertMoney.rupeesToPaise(amount) : undefined;

    recordRepository.updateRecord({
      id,
      amount: amountInPaise,
      type,
      category,
      record_date,
      note
    });

    const updatedRecord = recordRepository.getRecordById(id);

    return {
      ...updatedRecord,
      amount: convertMoney.paiseToRupees(updatedRecord.amount)
    };
  }

  async deleteRecord(id) {
    const recordExist = recordRepository.getRecordById(id);
    if (!recordExist) {
      throw new AppError('record not found', 404);
    }
    recordRepository.deleteRecord(id);

    return 'record deleted';
  }

}


export default new RecordService();