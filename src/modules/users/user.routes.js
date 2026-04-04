import express from 'express';
import controller from './user.controller.js';
const router = express.Router();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);
router.get('/:id', controller.getUser);

export default router;