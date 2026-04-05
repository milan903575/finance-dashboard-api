import express from 'express';
import dashboardController from './dashboard.controller.js';

const router = express.Router();

router.get('/summary', dashboardController.getDashboardSummary);

export default router;