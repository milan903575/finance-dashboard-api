import express from 'express';
import recordController from './record.controller.js';

const router = express.Router();

router.get('/', recordController.getRecords);

router.post('/', recordController.createRecord);

router.get('/:id', recordController.getRecord);

router.patch('/:id', recordController.updateRecord);

export default router;