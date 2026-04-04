import express from 'express';
import userRoutes from './users/user.routes.js';
import recordRoutes from './records/record.routes.js';

const router = express.Router();

router.use('/users', userRoutes);

router.use('/records', recordRoutes);

export default router;