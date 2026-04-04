import RecordService from './record.service.js';
import { sendSuccess } from '../../utils/response.helper.js';

async function createRecord(req, res, next) {
  try {
    const { amount, type, category, record_date, note, created_by } = req.body;
    const record = await RecordService.createRecord({ amount, type, category, record_date, note, created_by });
    sendSuccess(res, 201, record, 'record created successfully');
  } catch (error) {
    next(error);
  }
}


const recordController = {
  createRecord
};

export default recordController;