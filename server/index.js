import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';
import componentsRouter from './routes/components.js';
import buildsRouter from './routes/builds.js';
import compatibilityRouter from './routes/compatibility.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);


const configuredFrontendUrls = [
	...(process.env.FRONTEND_URL ?? 'http://localhost:5173').split(','),
	'https://buttermyloaf23.github.io/vexrig'
]
	.map((url) => url.trim().replace(/\/+$/, ''))
	.filter(Boolean);

app.use(cors({
	origin: (origin, callback) => {
		const isLocalDevelopment = process.env.NODE_ENV !== 'production' && /^http:\/\/localhost:\d+$/.test(origin ?? '');
		const normalizedOrigin = origin?.replace(/\/+$/, '');
		const isAllowed = !origin || configuredFrontendUrls.includes(normalizedOrigin) || isLocalDevelopment;
		callback(null, isAllowed);
	},
	credentials: true
}));
app.use(express.json());
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/components', componentsRouter);
app.use('/api/builds', buildsRouter);
app.use('/api/compatibility', compatibilityRouter);

app.use((_request, response) => {
	response.status(404).json({ message: 'Route not found' });
});

app.listen(port, '0.0.0.0', () => {
	console.log(`VexRig API listening on http://localhost:${port}`);
});
