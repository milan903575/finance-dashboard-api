import express from 'express';
import controller from './user.controller.js';
const router = express.Router();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);
router.get('/:id', controller.getUser);
router.patch('/:id/role/', controller.updateUserRole);
router.patch('/:id/status/', controller.updateUserStatus);

export default router;