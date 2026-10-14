import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);

app.use((_request, response) => {
	response.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
	console.log(`VexRig API listening on http://localhost:${port}`);
});
