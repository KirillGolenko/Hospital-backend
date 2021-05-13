import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const complaints = new Schema({
	name: String,
	doctor: String,
	date: Date,
	complaints: String,
});

const url =
	'mongodb+srv://hostpitalUser:lolilop9090@cluster0.kzy21.mongodb.net/hospital?retryWrites=true&w=majority';
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export const Complaints = mongoose.model('complaints', complaints);
