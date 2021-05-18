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

export const editComplaint = async (req, res, next) => {
	if (
		req.body.hasOwnProperty('name') &&
		req.body.hasOwnProperty('doctor') &&
		req.body.hasOwnProperty('date') &&
		req.body.hasOwnProperty('complaints')
	) {
		Complaints.updateOne(
			{ _id: req.body._id },
			{
				$set: req.body,
			},
			() => {
				Complaints.find().then(result => {
					res.send({ data: result });
				});
			}
		);
	} else {
		res.status(422).send('Error! Params not correct');
	}
};

export const deleteComplaint = async (req, res, next) => {
	const { _id } = req.params;
	Complaints.deleteOne({
		_id,
	}).then(() => {
		Complaints.find().then(result => {
			res.send({ data: result });
		});
	});
};
