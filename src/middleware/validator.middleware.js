import AppError from '../utils/app.error.js';
import { ROLES } from '../constants/roles.js';

function validateId(req, res, next) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    throw new AppError('invalid or missing id', 400);
  }

  next();

}

function createUser(req, res, next) {
  const { name, email, password, role_id } = req.body;

  if (!name || !email || !password || role_id === undefined) {
    throw new AppError('name, email, password and role_id are required', 400);
  }

  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('name must be a non-empty string', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('invalid email format', 400);
  }

  if (password.length < 6) {
    throw new AppError('password must be at least 6 characters', 400);
  }

  if (typeof role_id !== 'number' || ![1, 2, 3].includes(role_id)) {
    throw new AppError('role_id must be 1 (viewer), 2 (analyst), or 3 (admin)', 400);
  }

  next();
}

function updateUserRole(req, res, next) {
  validateId(req, res, (err) => {
    if (err) return next(err);

    const { role_id } = req.body;

    if (role_id === undefined) {
      return next(new AppError('role_id is required', 400));
    }

    if (typeof role_id !== 'number' || ![1, 2, 3].includes(role_id)) {
      return next(
        new AppError('role_id must be 1 (viewer), 2 (analyst), or 3 (admin)', 400)
      );
    }

    next();
  });
}

function updateUserStatus(req, res, next) {
  validateId(req, res, (err) => {
    if (err) return next(err);

    const { status } = req.body;

    if (status === undefined || status === null) {
      return next(new AppError('status is required', 400));
    }

    if (![0, 1].includes(Number(status))) {
      return next(new AppError('status must be 0 or 1', 400));
    }

    next();
  });
}

function createRecord(req, res, next) {
  const { amount, type, category, record_date } = req.body;

  if (!amount || !type || !category || !record_date) {
    throw new AppError('amount, type, category and record_date are required', 400);
  }

  if (isNaN(Number(amount)) || Number(amount) <= 0) {
    throw new AppError('amount must be a positive number', 400);
  }

  if (!['income', 'expense'].includes(type)) {
    throw new AppError('type must be income or expense', 400);
  }

  next();

}

function getRecords(req, res, next) {
  const { type, from, to, page, limit } = req.query;

  if (type && !['income', 'expense'].includes(type)) {
    throw new AppError('type must be income or expense', 400);
  }

  if ((from && !to) || (!from && to)) {
    throw new AppError('both from and to dates are required together', 400);
  }

  if (page && isNaN(Number(page))) {
    throw new AppError('page must be a number', 400);
  }

  if (limit && isNaN(Number(limit))) {
    throw new AppError('limit must be a number', 400);
  }

  next();

}

function updateRecord(req, res, next) {
  validateId(req, res, (err) => {

    if (err) return next(err);

    const allowed = ['amount', 'type', 'category', 'record_date', 'note'];
    const hasAtLeastOne = allowed.some((field) => req.body[field] !== undefined);

    if (!hasAtLeastOne) {
      return next(new AppError('at least one field must be provided to update', 400));
    }

    if (req.body.type && !['income', 'expense'].includes(req.body.type)) {
      return next(new AppError('type must be income or expense', 400));
    }

    if (req.body.amount && (isNaN(Number(req.body.amount)) || Number(req.body.amount) <= 0)) {
      return next(new AppError('amount must be a positive number', 400));
    }

    next();

  });
}

const validator = {
  validateId,
  createUser,
  updateUserRole,
  updateUserStatus,
  createRecord,
  getRecords,
  updateRecord
};

export default validator;