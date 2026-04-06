import express from 'express';
import authorize from '../middleware/authorization.middleware.js';
import { ROLES } from '../constants/roles.js'

import userRoutes from './users/user.routes.js';
import recordRoutes from './records/record.routes.js';
import dashboardRoutes from './dashboard/dashboard.routes.js';
import authenticate from '../middleware/authentication.middleware.js';


const router = express.Router();

router.use('/users', authenticate, authorize(ROLES.ADMIN), userRoutes);

router.use('/records', recordRoutes);

router.use('/dashboard', authorize(ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN), dashboardRoutes);

export default router;