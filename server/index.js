import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import healthRouter from './routes/health.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());
app.use('/api/health', healthRouter);

app.use((_request, response) => {
	response.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
	console.log(`VexRig API listening on http://localhost:${port}`);
});
