import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../lib/prisma.js';
import { calculateBuildTotal, getVerifiedComponents, normalizeComponents, serializeBuild } from '../lib/builds.js';

const router = Router();
const includeBuild = { buildComponents: { include: { component: true }, orderBy: { slot: 'asc' } } };

router.use(requireAuth);

router.get('/', async (request, response) => {
	const builds = await prisma.build.findMany({ where: { userId: request.user.id }, orderBy: { updatedAt: 'desc' } });
	return response.json(builds.map(serializeBuild));
});

router.get('/:id', async (request, response) => {
	const build = await prisma.build.findFirst({ where: { id: Number(request.params.id), userId: request.user.id }, include: includeBuild });
	if (!build) return response.status(404).json({ message: 'Build not found.' });
	return response.json(serializeBuild(build));
});

async function saveBuild(request, response, isUpdate) {
	const name = String(request.body.name ?? '').trim();
	if (!name) return response.status(400).json({ message: 'Build name is required.' });

	try {
		const components = normalizeComponents(request.body.components);
		const records = await getVerifiedComponents(components);
		const totalPrice = calculateBuildTotal(records);
		const data = {
			name,
			totalPrice,
			buildComponents: {
				deleteMany: {},
				create: components.map((item) => ({ componentId: item.componentId, slot: item.slot, slotIndex: item.slotIndex }))
			}
		};

		const build = isUpdate
			? await prisma.build.update({ where: { id: Number(request.params.id) }, data, include: includeBuild })
			: await prisma.build.create({ data: { ...data, user: { connect: { id: request.user.id } } }, include: includeBuild });
		return response.status(isUpdate ? 200 : 201).json(serializeBuild(build));
	} catch (error) {
		if (isUpdate && error.code === 'P2025') return response.status(404).json({ message: 'Build not found.' });
		if (error.message.includes('Invalid build') || error.message.includes('must be an array') || error.message.includes('do not exist')) return response.status(400).json({ message: error.message });
		console.error('Build save failed:', error);
		return response.status(500).json({ message: 'Unable to save build.' });
	}
}

router.post('/', (request, response) => saveBuild(request, response, false));
router.put('/:id', async (request, response) => {
	const owned = await prisma.build.findFirst({ where: { id: Number(request.params.id), userId: request.user.id }, select: { id: true } });
	if (!owned) return response.status(404).json({ message: 'Build not found.' });
	return saveBuild(request, response, true);
});

router.delete('/:id', async (request, response) => {
	const result = await prisma.build.deleteMany({ where: { id: Number(request.params.id), userId: request.user.id } });
	if (!result.count) return response.status(404).json({ message: 'Build not found.' });
	return response.status(204).send();
});

export default router;
