import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Schema = mongoose.Schema;
const users = new Schema({
	login: String,
	password: String,
});

const url = process.env.DATABASE_URL;
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export const Users = mongoose.model('users', users);
