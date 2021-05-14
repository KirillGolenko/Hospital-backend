import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../mongobd/user.js';
import dotenv from 'dotenv';
dotenv.config();

const createHash = login => {
	let signature = {
		user: login,
		iat: Math.floor(Date.now() / 1000) - 30,
	};
	let older_token = jwt.sign(signature, process.env.SECRET);
	return older_token;
};

export const getAllUsers = async (req, res, next) => {
	Users.find().then(result => {
		res.send({ data: result });
	});
};

export const login = async (req, res, next) => {
	const { login, password } = req.body;

	if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
		Users.findOne({ login: login })
			.then(result => {
				bcrypt.compare(password, result.password).then(resultPass => {
					if (resultPass) {
						res.send({ token: createHash(login) });
					} else {
						res.status(401).json({ error: 'Указанный пароль не верный' });
					}
				});
			})
			.catch(err => {
				res.status(404).json({ error: 'Данный пользователь не найден' });
			});
	} else {
		res.status(422).send('Error! Params not correct');
	}
};

export const register = async (req, res, next) => {
	const { login, password } = req.body;
	let dublicate = await Users.findOne({ login });

	if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
		if (dublicate) {
			res.status(401).json({ error: 'Такой пользователь уже есть' });
		} else {
			const user = new Users({
				login,
				password: bcrypt.hashSync(
					password,
					bcrypt.genSaltSync(process.env.SALT)
				),
			});
			user.save().then(result => {
				res.send({ data: result, token: createHash(login) });
			});
		}
	} else {
		res.status(422).send('Указанны не верные параметры.');
	}
};
