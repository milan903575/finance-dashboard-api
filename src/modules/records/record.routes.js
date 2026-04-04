import express from 'express';
import recordController from './record.controller.js';

const router = express.Router();

router.get('/', recordController.getRecords);

router.post('/', recordController.createRecord);

export default router;