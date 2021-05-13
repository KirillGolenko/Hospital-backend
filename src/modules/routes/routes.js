import { Router } from 'express';
const router = Router();

import {
	login,
	register,
	getAllUsers,
} from '../controllers/user.controller.js';

router.get('/users', getAllUsers);
router.post('/register', register);
router.post('/login', login);
// router.patch('/updateTask', changeTaskInfo);
// router.get('/infoTask', infoTask);
// router.delete('/deleteTask', deleteTask);

export default router;
