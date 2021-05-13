import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const users = new Schema({
	login: String,
	password: String,
});

const url =
	'mongodb+srv://hostpitalUser:lolilop9090@cluster0.kzy21.mongodb.net/hospital?retryWrites=true&w=majority';
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export const Users = mongoose.model('users', users);
