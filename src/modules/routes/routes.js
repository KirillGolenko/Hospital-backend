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
	deleteComplaint,
	editComplaint,
} from '../controllers/complaints.controller.js';

router.get('/users', getAllUsers);
router.get('/all', allComplaints);

router.post('/register', register);
router.post('/login', login);
router.post('/add', addComplaints);

router.delete('/deleteComplaint/:_id', deleteComplaint);
router.post('/editComplaint', editComplaint);

export default router;
