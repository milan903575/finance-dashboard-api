import recordRepository from './record.repository.js';
import AppError from '../../utils/app.error.js';
import userRepository from '../users/user.repository.js';
import convertMoney from '../../utils/money.js';

class RecordService {
  async createRecord({ amount, type, category, record_date, note, created_by }) {
    const userExists = await userRepository.getUserById(created_by);

    if (!userExists) {
      throw new AppError('user not found', 404);
    }

    const amountInPaise = convertMoney.rupeesToPaise(amount);

    const record = await recordRepository.insertRecord({
      amount: amountInPaise,
      type,
      category,
      record_date,
      note,
      created_by
    });

    return {
      id: record.id,
      amount: convertMoney.paiseToRupees(record.amount),
      type: record.type,
      category: record.category,
      record_date: record.record_date,
      note: record.note,
      created_by: userExists.name
    };
  }

  async getRecords({ type, category, from, to, page, limit }) {
    const offset = (page - 1) * limit;

    const records = await recordRepository.getRecords({
      type,
      category,
      from,
      to,
      offset,
      limit
    });

    return records.map((record) => ({
      ...record,
      amount: convertMoney.paiseToRupees(record.amount)
    }));
  }

  async getRecord(id) {
    const record = await recordRepository.getRecordById(id);

    if (!record) {
      throw new AppError('record not found', 404);
    }

    return {
      ...record,
      amount: convertMoney.paiseToRupees(record.amount)
    };
  }

  async updateRecord({ id, amount, type, category, record_date, note }) {
    const record = await recordRepository.getRecordById(id);

    if (!record) {
      throw new AppError('record not found', 404);
    }

    const amountInPaise = amount != null ? convertMoney.rupeesToPaise(amount) : amount;

    const updatedRecord = await recordRepository.updateRecord({
      id,
      amount: amountInPaise,
      type,
      category,
      record_date,
      note
    });

    return {
      ...updatedRecord,
      amount: convertMoney.paiseToRupees(updatedRecord.amount)
    };
  }

  async deleteRecord(id) {
    const recordExist = await recordRepository.getRecordById(id);

    if (!recordExist) {
      throw new AppError('record not found', 404);
    }

    await recordRepository.deleteRecord(id);

    return 'record deleted';
  }
}

export default new RecordService();