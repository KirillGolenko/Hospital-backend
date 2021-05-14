import { Router } from 'express';
const router = Router();

import {
	login,
	register,
	getAllUsers,
} from '../controllers/user.controller.js';

import {
	allComplaints,
	addComplaints,
} from '../controllers/complaints.controller.js';

router.get('/users', getAllUsers);
router.get('/all', allComplaints);

router.post('/register', register);
router.post('/login', login);
router.post('/add', addComplaints);
// router.patch('/updateTask', changeTaskInfo);
// router.get('/infoTask', infoTask);
// router.delete('/deleteTask', deleteTask);

export default router;
