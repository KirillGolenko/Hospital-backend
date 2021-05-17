import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Schema = mongoose.Schema;
const complaints = new Schema({
	name: String,
	doctor: String,
	date: Date,
	complaints: String,
});

const url = process.env.DATABASE_URL;
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export const Complaints = mongoose.model('complaints', complaints);
