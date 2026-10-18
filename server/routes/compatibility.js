import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../lib/prisma.js';
import { checkServerCompatibility } from '../lib/compatibility.js';

const router = Router();

router.post('/check', requireAuth, async (request, response) => {
	const ids = Array.isArray(request.body.componentIds) ? request.body.componentIds.map(Number) : [];
	if (!ids.length) return response.json({ compatible: false, issues: [], warnings: ['Select components before checking compatibility.'] });
	const components = await prisma.component.findMany({ where: { id: { in: ids } } });
	return response.json(checkServerCompatibility(components));
});

export default router;
