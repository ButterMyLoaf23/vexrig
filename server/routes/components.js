import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { normalizeCategory, serializeComponent } from '../lib/components.js';

const router = Router();

function filtersFromQuery(query) {
	const { search = '', category, minPrice, maxPrice } = query;
	const where = {};
	if (search.trim()) {
		where.OR = [
			{ name: { contains: search.trim(), mode: 'insensitive' } },
			{ brand: { contains: search.trim(), mode: 'insensitive' } }
		];
	}
	if (category && category !== 'all') where.category = normalizeCategory(category);
	if (minPrice !== undefined || maxPrice !== undefined) {
		where.price = {};
		if (minPrice !== undefined && minPrice !== '') where.price.gte = Number(minPrice);
		if (maxPrice !== undefined && maxPrice !== '') where.price.lte = Number(maxPrice);
	}
	return where;
}

router.get('/', async (request, response) => {
	try {
		const components = await prisma.component.findMany({ where: filtersFromQuery(request.query), orderBy: { category: 'asc' } });
		return response.json(components.map(serializeComponent));
	} catch (error) {
		console.error('Component list failed:', error);
		return response.status(500).json({ message: 'Unable to load components.' });
	}
});

router.get('/category/:category', async (request, response) => {
	try {
		const components = await prisma.component.findMany({ where: { category: normalizeCategory(request.params.category) }, orderBy: { name: 'asc' } });
		return response.json(components.map(serializeComponent));
	} catch (error) {
		return response.status(500).json({ message: 'Unable to load components.' });
	}
});

router.get('/:id', async (request, response) => {
	const id = Number(request.params.id);
	if (!Number.isInteger(id)) return response.status(400).json({ message: 'Invalid component ID.' });
	const component = await prisma.component.findUnique({ where: { id } });
	if (!component) return response.status(404).json({ message: 'Component not found.' });
	return response.json(serializeComponent(component));
});

export default router;
