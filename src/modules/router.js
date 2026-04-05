import express from 'express';
import userRoutes from './users/user.routes.js';
import recordRoutes from './records/record.routes.js';
import dashboardRoutes from './dashbord/dashboard.routes.js';


const router = express.Router();

router.use('/users', userRoutes);

router.use('/records', recordRoutes);

router.use('/dashboard', dashboardRoutes);

export default router;