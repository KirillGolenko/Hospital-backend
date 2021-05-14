import express from 'express';
import cors from 'cors';
import apiRoutes from './src/modules/routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', apiRoutes);

app.listen(8080, () => {
	console.log('Hospital backend listing from: 8080!');
});
