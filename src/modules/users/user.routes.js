import express from 'express';
import controller from './user.controller.js';
import validator from '../../middleware/validator.middleware.js';
const router = express.Router();

router.get('/', controller.getUsers);

router.post('/', validator.createUser, controller.createUser);

router.get('/:id', validator.validateId, controller.getUser);

router.patch('/:id/role/', validator.updateUserRole, controller.updateUserRole);

router.patch('/:id/status/', validator.updateUserStatus, controller.updateUserStatus);

export default router;