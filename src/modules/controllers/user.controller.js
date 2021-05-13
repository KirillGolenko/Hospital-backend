import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../mongobd/user.js';

export const getAllUsers = async (req, res, next) => {
	Users.find().then(result => {
		res.send({ data: result });
	});
};

export const login = async (req, res, next) => {
	const { login, password } = req.body;
	let older_token = jwt.sign(
		{
			user: login,
			iat: Math.floor(Date.now() / 1000) - 30,
		},
		'secret'
	);

	if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
		Users.findOne({ login: login })
			.then(result => {
				bcrypt.compare(password, result.password).then(resultPass => {
					if (resultPass) {
						res.send({ token: older_token });
						res.status(400).json({ error: 'Указанный пароль верный' });
					} else {
						res.status(400).json({ error: 'Указанный пароль не верный' });
					}
				});
			})
			.catch(err => {
				res.status(400).json({ error: 'Данный пользователь не найден' });
			});
	} else {
		res.status(422).send('Error! Params not correct');
	}
};

export const register = async (req, res, next) => {
	const { login, password } = req.body;
	let dublicate = await Users.findOne({ login: login });
	let older_token = jwt.sign(
		{
			user: login,
			iat: Math.floor(Date.now() / 1000) - 30,
		},
		'secret'
	);

	if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
		if (dublicate) {
			res.status(401).json({ error: 'Такой пользователь уже есть' });
		} else {
			const user = new Users({
				login: login,
				password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
			});
			user.save().then(result => {
				res.send({ data: result, token: older_token });
			});
		}
	} else {
		res.status(422).send('Указанны не верные параметры.');
	}
};
