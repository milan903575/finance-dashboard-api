import express from 'express';
import authorize from '../../middleware/authorization.middleware.js';
import { ROLES } from '../../constants/roles.js'
import recordController from './record.controller.js';
import validator from '../../middleware/validator.middleware.js';

const router = express.Router();

router.post('/', authorize(ROLES.ADMIN), validator.createRecord, recordController.createRecord);

router.get('/', authorize(ROLES.ANALYST, ROLES.ADMIN), validator.getRecords, recordController.getRecords);

router.get('/:id', authorize(ROLES.ANALYST, ROLES.ADMIN), validator.validateId, recordController.getRecord);

router.patch('/:id', authorize(ROLES.ADMIN), validator.updateRecord, recordController.updateRecord);

router.delete('/:id', authorize(ROLES.ADMIN), validator.validateId, recordController.deleteRecord);

export default router;