import { Complaints } from '../mongobd/complaints.js';
import dotenv from 'dotenv';
dotenv.config();

export const allComplaints = async (req, res, next) => {
	Complaints.find().then(result => {
		res.send({ data: result });
	});
};

export const addComplaints = async (req, res, next) => {
	const { name, doctor, date, complaints } = req.body;
	if (
		req.body.hasOwnProperty('name') &&
		req.body.hasOwnProperty('doctor') &&
		req.body.hasOwnProperty('date') &&
		req.body.hasOwnProperty('complaints')
	) {
		const newComplaints = new Complaints({
			name,
			doctor,
			date,
			complaints,
		});

		newComplaints.save().then(result => {
			res.send({ data: result });
		});
	} else {
		res.status(422).send('Error! Params not correct');
	}
};
