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

async function getRecords(req, res, next) {
  try {
    const { type, category, from, to, page = 1, limit = 10 } = req.query;
    const records = await RecordService.getRecords({ type, category, from, to, page, limit });
    sendSuccess(res, 200, records, 'records fetched successfully');
  } catch (error) {
    next(error);
  }
}

async function getRecord(req, res, next) {
  try {
    const { id } = req.params;
    const record = await RecordService.getRecord(id);
    sendSuccess(res, 200, record, 'record fetched successfully');
  } catch (error) {
    next(error);
  }
}

const recordController = {
  createRecord,
  getRecords,
  getRecord
};

export default recordController;