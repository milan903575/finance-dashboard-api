import express from 'express';
import authorize from '../../middleware/authorization.middleware.js';
import { ROLES } from '../../constants/roles.js'

import recordController from './record.controller.js';

const router = express.Router();

router.get('/', authorize(ROLES.ANALYST, ROLES.ADMIN), recordController.getRecords);

router.post('/', authorize(ROLES.ADMIN), recordController.createRecord);

router.get('/:id', authorize(ROLES.ANALYST, ROLES.ADMIN), recordController.getRecord);

router.patch('/:id', authorize(ROLES.ADMIN), recordController.updateRecord);

router.delete('/:id', authorize(ROLES.ADMIN), recordController.deleteRecord);

export default router;