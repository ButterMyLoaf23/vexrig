import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/', async (_request, response) => {
	try {
		await prisma.$queryRaw`SELECT 1`;
		return response.json({ status: 'ok', database: 'connected' });
	} catch (error) {
		console.error('Health check database failure:', error);
		return response.status(503).json({ status: 'error', database: 'unavailable' });
	}
});

export default router;
